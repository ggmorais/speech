import React from 'react';
import style from './chat.module.scss';
import Logoff from './components/Logoff';
import NewRoom from './components/NewRoom';
import RoomList from './components/RoomList';
import RoomWindow from './components/RoomWindow';

const View = props => (
  <div className={style.container}>
    <div className={style.blockLeft}>
      <Logoff />
      <NewRoom />
      <div className={style.roomList}>
        <RoomList />
      </div>
    </div>
    <RoomWindow />
  </div>
)

export default View;