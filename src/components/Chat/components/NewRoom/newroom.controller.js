import React from 'react';
import View from './newroom.view';
import config from 'config';
import jwt from 'jwt-decode';

const Controller = props => {

  const [ layer, setLayer ] = React.useState(false);
  const [ roomName, setRoomName ] = React.useState('');

  const handleChanges = e => {
    setRoomName(e.target.value);
  }

  const handleLayer = e => {
    setLayer(layer ? false : true);
  }

  const handleSubmit = e => {
    e.preventDefault();

    alert('criando sala')

    // fetch(config.api + '/rooms', {
    //   method: 'POST',
    //   headers: {
    //     ContentType: 'application/json',
    //     authorization: localStorage.getItem('@speech/token')
    //   },
    //   body: JSON.stringify({
    //     name: roomName
    //   })
    // })
  }

  return (
    <View
      roomName={roomName}
      handleChanges={handleChanges}
      handleSubmit={handleSubmit}
      handleLayer={handleLayer}
      layer={layer}
    />
  );

};

export default Controller;