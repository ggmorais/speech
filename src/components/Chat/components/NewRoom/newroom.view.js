import React from 'react';
import style from './newroom.module.scss';

const View = props => (
  <div className={style.container}>
    <form onSubmit={props.handleSubmit}>
      <input
        name="name"
        value={props.roomName}
        onChange={props.handleChanges}
      />
      <button>Create</button>
    </form>
  </div>
);

export default View;