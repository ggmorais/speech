import React from 'react';
import style from './list.module.scss';

const View = props => (
  <div 
    className={style.container} 
    onClick={props.handleSelect.bind(this, props._id)}
  >
    <p className={style.roomName}>{props.name}</p>
  </div>
);

export default View;