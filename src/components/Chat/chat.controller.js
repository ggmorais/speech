import React from 'react';
import View from './chat.view';
import Login from './components/Login';
import isTokenValid from 'components/isTokenValid';
import ChatProvider from 'contexts/ChatProvider';

const Controller = props => {

  const [ showLogin, setShowLogin ] = React.useState(false);

  React.useEffect(() => {
    // Verify if the token exists
    if (!localStorage.getItem('@speech/token')) {
      setShowLogin(true);
    } else {
      // If exists, verify if is valid
      isTokenValid()
        .then(r => {
          if (!r) {
            localStorage.removeItem('@speech/token');
            setShowLogin(true);
          }
        })
    }
  }, []);

  if (showLogin) return <Login show={setShowLogin} />

  return (
    <ChatProvider>
      <View />
    </ChatProvider>
  );

};

export default Controller;