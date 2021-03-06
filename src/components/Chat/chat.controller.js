import hashRoute from 'components/hashRoute';
import isTokenValid from 'components/isTokenValid';
import config from 'config';
import ChatProvider from 'contexts/ChatProvider';
import JwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import View from './chat.view';
import Login from './components/Login';
import Register from './components/Register/register';

const Controller = props => {

  const [ showLogin, setShowLogin ] = React.useState(false);
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

  useEffect(() => {
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

  if (route.register) {
    return <Register />
  }
  
  if (showLogin) return <Login show={setShowLogin} />

  return (
    <ChatProvider>
      <View />
    </ChatProvider>
  );

};

export default Controller;