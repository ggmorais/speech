import React from 'react';
import style from './chat.module.scss';
import RoomList from './components/RoomList';
import RoomWindow from './components/RoomWindow';
import Logoff from './components/Logoff';
import NewRoom from './components/NewRoom';

const View = props => (
  <div className={style.container}>
    <div className={style.blockLeft}>
      <Logoff />
      <NewRoom />
      <RoomList />
    </div>
    <RoomWindow />
  </div>
)

export default View;