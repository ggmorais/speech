import React from 'react';
import View from './list.view';
import config from 'config';
import { ChatContext } from 'contexts/ChatProvider';

const Controller = props => {

  const [ room, setRoom ] = React.useState('');
  const { rooms, user } = React.useContext(ChatContext);

  const handleSelect = id => {
    localStorage.setItem('@speech/roomId', id);
  }

  return (
    <div>
      { rooms.rooms && rooms.rooms.map(room => (
          <View
            { ...room } 
            key={room._id} 
            handleSelect={handleSelect}
          />
        )
      )}
    </div>
  );

};

export default Controller;