import React from 'react';
import View from './chat.view';
import Login from './components/Login';
import isTokenValid from 'components/isTokenValid';
import ChatProvider from 'contexts/ChatProvider';

const Controller = props => {

  const [ showLogin, setShowLogin ] = React.useState(true);
  const token = localStorage.getItem('@speech/token');

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

  if (showLogin) return <Login show={setShowLogin} />

  if (!showLogin) return (
    <ChatProvider>
      <View />
    </ChatProvider>
  );

};

export default Controller;