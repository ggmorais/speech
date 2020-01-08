import React from 'react'
import View from './enter.view';

const Controller = props => {

  const [ layer, setLayer ] = React.useState(false);
  const [ roomId, setRoomId ] = React.useState('');

  const handleLayer = e => {
    setLayer(layer ? false : true);
  }

  const handleChanges = e => {
    setRoomId(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    alert('entrando na sala id ', roomId);
  }

  return (
    <View 
      layer={layer} 
      handleLayer={handleLayer}
      handleChanges={handleChanges}
      handleSubmit={handleSubmit}
    />
  );

}

export default Controller;