import React from 'react';
import style from './window.module.scss';
import { Input, Button, NewMessage, Message } from 'components/Models';

const View = props => (
  <div className={style.container}>
    <div className={style.window}>
      <Message />
    </div>
    <NewMessage 
      onChange={props.handleNewMessage}
      onClick={props.handleSubmit}
      value={props.message}
    />
  </div>
);

export default View;