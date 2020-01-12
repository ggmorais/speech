import React, { useState, useContext } from 'react';
import View from './newroom.view';
import config from 'config';
import jwt from 'jwt-decode';
import { ChatContext } from 'contexts/ChatProvider';

const Controller = props => {

  const [ layer, setLayer ] = useState(false);
  const [ roomName, setRoomName ] = useState('');
  const [ invite, setInvite ] = useState('');
  const { user, fetchRooms } = useContext(ChatContext);

  const handleChanges = e => {
    setRoomName(e.target.value);
  }

  const handleLayer = e => {
    setLayer(layer ? false : true);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const create = await fetch(config.api + '/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('@speech/token')
      },
      body: JSON.stringify({
        name: roomName,
        userId: user._id
      })
    })

    const response = await create.json();

    console.log(response)

    if (response) {
      setInvite('http://localhost:3000/#room=' + response._id);
    }

    if (create.status === 200) {
      setRoomName('');
      fetchRooms();
    }
  }

  return (
    <View
      roomName={roomName}
      handleChanges={handleChanges}
      handleSubmit={handleSubmit}
      handleLayer={handleLayer}
      layer={layer}
      invite={invite}
    />
  );

};

export default Controller;