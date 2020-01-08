import React from 'react';
import { Button } from 'components/Models';
import style from './logoff.module.scss';

const View = props => {

  return (
    <div className={style.container}>
      <p className={style.username}>{props.username}</p>
      <Button cancel width="90%" title="Log out" onClick={props.handleButton} />
    </div>
  );

}

export default View;