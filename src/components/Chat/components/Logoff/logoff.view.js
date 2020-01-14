import React from 'react';
import { MdFace } from 'react-icons/md';
import style from './logoff.module.scss';

const View = props => {

  return (
    <div className={style.container}>
      <MdFace size="40px" className={style.face} />
      <p className={style.username}>{props.username}</p>
      {/* <Button cancel width="90%" title="Log out" onClick={props.handleButton} /> */}
    </div>
  );

}

export default View;