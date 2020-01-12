import React from 'react';
import style from './chat.module.scss';
import RoomList from './components/RoomList';
import RoomWindow from './components/RoomWindow';
import Logoff from './components/Logoff';
import NewRoom from './components/NewRoom';
import EnterRoom from './components/EnterRoom';

const View = props => (
  <div className={style.container}>
    <div className={style.blockLeft}>
      <Logoff />
      <EnterRoom />
      <NewRoom />
      <div className={style.roomList}>
        <RoomList />
      </div>
    </div>
    <RoomWindow />
  </div>
)

export default View;