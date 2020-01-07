import React from 'react';
import View from './newroom.view';
import config from 'config';
import jwt from 'jwt-decode';

const Controller = props => {

  const [ roomName, setRoomName ] = React.useState('');

  const handleChanges = e => {
    setRoomName(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    fetch(config.api + '/rooms', {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        authorization: localStorage.getItem('@speech/token')
      },
      body: JSON.stringify({
        name: roomName
      })
    })
  }

  return (
    <View
      roomName={roomName}
      handleChanges={handleChanges}
      handleSubmit={handleSubmit}
    />
  );

};

export default Controller;