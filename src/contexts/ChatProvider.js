import config from 'config';
import JwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import socket from 'socket.io-client';

const io = socket(config.socket);

export const ChatContext = createContext();

const ChatProvider = props => {

  const token = localStorage.getItem('@speech/token');
  const [ roomList, setRoomList ] = useState(false);
  const [ roomData, setRoomData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ selectedRoom, setSelectedRoom ] = useState(localStorage.getItem('@speech/room'));
  const [ user, setUser ] = useState('');

  try {
    setUser(JwtDecode(token));
  } catch(err) {}

  const fetchNewRoomData = data => {
    let oldData = [ ...roomData ];
    let find = false;
    if (roomData.length != 0) {
      for (let i of oldData) {
        if (i._id === data[0]._id) {
          find = true;
        }
      }
      if (!find) {
        oldData.push(data[0]);
        setRoomData(oldData);
      }
    } else {
      setRoomData(data);
    }
  }

  const sendNewMessage = (roomId, body) => {
    let oldData = [ ...roomData ];
    for (let i in oldData) {
      if (oldData[i]._id === roomId) {
        oldData[i].messages.push({
          _id: roomId + oldData[i].messages.length + 1,
          postDate: Date.now(),
          body: body,
          user: user
        })
      }
    }

    setRoomData(oldData);

    io.emit('newMessage', {
      userId: user._id,
      roomId: roomId,
      body: body
    })
  }

  const selectRoom = roomId => {
    localStorage.setItem('@speech/room', roomId);
    setSelectedRoom(roomId);
    io.emit('selectedRoom', roomId);
  }

  const fetchNewMessage = data => {
    let oldData = [ ...roomData ];
    for (let i in oldData) {
      if (oldData[i]._id === data._id) {
        oldData[i].messages.push(data.messages[0]);
      }
    }
    setRoomData(oldData);
  }

  const orderByDate = list => {
    list = list.sort((a, b) => {
      if (a.messages.length < 1 || b.messages.length < 1) {
        return 0;
      }
      return new Date(a.messages[0].postDate) - new Date(b.messages[0].postDate)
    });
    console.log(list);
    return list;
  }

  useEffect(() => {
    selectRoom(selectedRoom);

    io.emit('userId', user._id);

    io.on('roomList', docs => {
      console.log('receiving new roomList')
      let ordered = orderByDate(docs);
      setRoomList(ordered);
    });
  }, []);

  useEffect(() => {
    io.on('newMessage', msg => {
      console.log('receiving new message');
      fetchNewMessage(msg)
    });

    return () => io.off('newMessage');
  })

  useEffect(() => {
    io.on('roomData', docs => fetchNewRoomData(docs))

    // Clean up
    return () => io.off('roomData');
  });

  useEffect(() => {
    if (!roomList) return;
    if (roomData.length < 1) return;

    let oldList = [ ...roomList ];
    for (let i in oldList) {
      for (let b in roomData) {
        if (roomData[b]._id === oldList[i]._id) {
          if (roomData[b].messages.length > 0 && oldList[i].messages.length > 0) {
            if (roomData[b].messages[roomData[b].messages.length - 1]._id !== oldList[i].messages[oldList[i].messages.length - 1]._id) {
              oldList[i].messages.push(roomData[b].messages[roomData[b].messages.length - 1]);
            }
          }
        }
      }
    }
    setRoomList(oldList);
  }, [roomData]);

  return (
    <ChatContext.Provider value={{
      roomList,
      roomData,
      user, 
      token,  
      selectedRoom, 
      selectRoom, 
      isLoading, 
      sendNewMessage 
    }}>
      { props.children }
    </ChatContext.Provider>
  );

}

export default ChatProvider;