import React from 'react';
import style from './login.module.scss';

const View = props => {

  return (
    <div className={style.container}>
      <p className={style.message}>{ props.message }</p>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={props.handleChanges}
          value={props.changes.username}
        />
        <input
          type="password"
          name="password"
          onChange={props.handleChanges}
          value={props.changes.password}
        />
        <button>Login</button>
      </form>
    </div>
  );

}

export default View;