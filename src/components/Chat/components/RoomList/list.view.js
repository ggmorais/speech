import React from 'react';
import style from './list.module.scss';

const View = props => (
  <div className={style.container}>
    { props.name }
  </div>
);

export default View;