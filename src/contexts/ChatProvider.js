import config from 'config';
import JwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const ChatContext = createContext();

const ChatProvider = props => {

  const token = localStorage.getItem('@speech/token');
  const [ rooms, setRooms ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ selectedRoom, setSelectedRoom ] = useState(localStorage.getItem('@speech/room'));
  const [ user, setUser ] = useState('');

  try {
    setUser(JwtDecode(token));
  } catch(err) {}

  const fetchRooms = async () => {
    const data = await fetch(config.api + '/rooms/' + user._id, {
      headers: {
        authorization: token
      }
    });

    const response = await data.json();
    
    if (response) {
      setRooms(response.rooms);
      setIsLoading(false);
    }
  }

  const updateRoom = (roomId, body) => {
    let copy = [...rooms];
    for (let i in copy) {
      if (copy[i]._id === roomId) {
        copy[i].messages.push({
          postDate: Date.now(),
          _id: copy[i].messages.length + 1,
          user: user,
          body: body
        })

        setRooms(() => {
          return copy;
        });
      }
    }
  }

  const selectRoom = roomId => {
    localStorage.setItem('@speech/room', roomId);
    setSelectedRoom(roomId);
  }

  useEffect(() => {
    // Obtain the rooms data from the API
    fetchRooms();
  }, []);

  return (
    <ChatContext.Provider value={ { user, rooms, token, updateRoom, selectedRoom, selectRoom, isLoading, fetchRooms } }>
      { props.children }
    </ChatContext.Provider>
  );

}

export default ChatProvider;