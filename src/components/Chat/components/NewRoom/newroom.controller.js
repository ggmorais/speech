import config from 'config';
import { ChatContext } from 'contexts/ChatProvider';
import React, { useContext, useState } from 'react';
import View from './newroom.view';

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

    if (roomName.length < 3) return;

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