import React, { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import config from 'config';

export const ChatContext = createContext();

const ChatProvider = props => {

  const token = localStorage.getItem('@speech/token');
  const user = jwtDecode(token)
  const [ rooms, setRooms ] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState(localStorage.getItem('@speech/room'));

  const fetchRooms = async () => {
    const data = await fetch(config.api + '/rooms/' + user._id, {
      headers: {
        authorization: token
      }
    });

    const response = await data.json();
    
    if (rooms.length === 0) {
      setRooms(response.rooms);
    } else {
    
      for (let room of response.rooms) {

      }
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
          // let old = [...rooms];
          // old.rooms = copy;
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
    <ChatContext.Provider value={ { user, rooms, token, updateRoom, selectedRoom, selectRoom } }>
      { props.children }
    </ChatContext.Provider>
  );

}

export default ChatProvider;