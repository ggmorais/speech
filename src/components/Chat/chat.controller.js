import React from 'react';
import View from './chat.view';
import Login from './components/Login';
import isTokenValid from 'components/isTokenValid';
import ChatProvider from 'contexts/ChatProvider';
import hashRoute from 'components/hashRoute';
import config from 'config';
import JwtDecode from 'jwt-decode';

const Controller = props => {

  const [ showLogin, setShowLogin ] = React.useState(true);
  const token = localStorage.getItem('@speech/token');

  const route = hashRoute();

  const invitedToRoom = async () => {
    const enter = await fetch(config.api + '/rooms/e/' + route.room, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({
        userId: JwtDecode(token)._id
      })
    });
    
    if (enter.status === 200) {
      localStorage.setItem('@speech/room', route.room);
      window.location.replace('http://localhost:3000');
    }
    
  }

  React.useEffect(() => {
    // Verify if the token exists
    if (!token) {
      setShowLogin(true);
    } else {
      // If exists, verify if is valid
      isTokenValid()
        .then(r => {
          if (!r) {
            localStorage.removeItem('@speech/token');
            setShowLogin(true);
          } else {
            setShowLogin(false);
          }
        })
    }
  }, []);

  if (route.room) {
    invitedToRoom();
    return <div/>;
  }

  if (showLogin) return <Login show={setShowLogin} />

  if (!showLogin) return (
    <ChatProvider>
      <View />
    </ChatProvider>
  );

};

export default Controller;