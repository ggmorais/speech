import React from 'react';
import socket from 'socket.io-client';
import Chat from 'components/Chat';
import style from 'app.module.scss';

function App() {

  const io = socket('http://localhost:5000');

  io.on('message', msg => {
    console.log('recebendo menssagem do socket: ', msg);
  })

  return (
    <div className={style.container}>
      <Chat />
    </div>
  );
}

export default App;
