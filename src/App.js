import React from 'react';
import socket from 'socket.io-client';
import Chat from 'components/Chat';
import style from 'app.module.scss';

function App() {

  return (
    <div className={style.container}>
      <Chat />
    </div>
  );
}

export default App;
