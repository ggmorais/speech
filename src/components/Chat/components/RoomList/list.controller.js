import React from 'react';
import View from './list.view';
import config from 'config';
import { ChatContext } from 'contexts/ChatProvider';

const Controller = props => {

  const { rooms, user } = React.useContext(ChatContext);
  
  return (
    <div>
      { rooms.rooms && rooms.rooms.map(room => (
          <View key={room._id} { ...room } />
        )
      )}
    </div>
  );

};

export default Controller;