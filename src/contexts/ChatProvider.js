import config from 'config';
import JwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import socket from 'socket.io-client';

const io = socket('http://localhost:5000');

export const ChatContext = createContext();

const ChatProvider = props => {

  const token = localStorage.getItem('@speech/token');
  const [ rooms, setRooms ] = useState([]);
  const [ roomList, setRoomList ] = useState(false);
  const [ roomData, setRoomData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ selectedRoom, setSelectedRoom ] = useState(localStorage.getItem('@speech/room'));
  const [ user, setUser ] = useState('');

  const [ count, setCount ] = useState(0);

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

  const fetchNewData = data => {
    let oldData = [ ...roomData ];
    oldData.push(data[0]);
    setRoomData(oldData);
    console.log(roomData);
  }

  const sendNewMessage = (roomId, body) => {
    io.emit('newMessage', {
      roomId: roomId,
      body: body
    })
  }

  const selectRoom = roomId => {
    localStorage.setItem('@speech/room', roomId);
    setSelectedRoom(roomId);
  }

  useEffect(() => {
    // Obtain the rooms data from the API
    //fetchRooms();

    io.emit('userId', user._id);

    io.on('roomList', docs => {
      console.log('receiving new roomList')
      setRoomList(docs);
    });

  useEffect(() => {
    io.on('roomData', docs => {
      if (roomData.length != 0) {
        console.log('not empty')
      } else {
        setRoomData(docs);
      }
    })
  });

    io.on('test', x => console.log(x))

  }, []);

  console.log(count)

  useEffect(() => {
    console.log('selecting other room')
    io.emit('selectedRoom', selectedRoom);
  }, [selectedRoom])

  return (
    <ChatContext.Provider value={{
      roomList,
      roomData,
      user, 
      rooms, 
      token, 
      updateRoom, 
      selectedRoom, 
      selectRoom, 
      isLoading, 
      fetchRooms, 
      sendNewMessage 
    }}>
      { props.children }
    </ChatContext.Provider>
  );

}

export default ChatProvider;