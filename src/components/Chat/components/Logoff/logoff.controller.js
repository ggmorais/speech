import React from 'react';
import View from './logoff.view';
import { ChatContext } from 'contexts/ChatProvider';

const Controller = props => {

  const { user } = React.useContext(ChatContext);

  const handleButton = e => {
    e.preventDefault();

    localStorage.setItem('@speech/token', false);
  }

  return (
    <View 
      handleButton={handleButton}
      username={user.username}
    />
  );
  
}

export default Controller;