import React from 'react';
import style from './login.module.scss';
import labels from 'components/scss_modules/labels.module.scss';

const View = props => {

  return (
    <div className={style.container}>
      <p 
        className={labels.warning} 
        style={ { display: props.message ? 'block' : 'none' } }>
        { props.message }
      </p>
      <form className={style.form} onSubmit={props.handleSubmit}>
        <label>
          <p className={style.inputName}>Username</p>
          <input
            className={style.input}
            type="text"
            name="username"
            onChange={props.handleChanges}
            value={props.changes.username}
          />
        </label>
        <label>
          <p className={style.inputName}>Password</p>
          <input
            className={style.input}
            type="password"
            name="password"
            onChange={props.handleChanges}
            value={props.changes.password}
          />
        </label>
        <p>
          <button className={labels.buttonDone}>Login</button>
        </p>
      </form>
    </div>
  );

}

export default View;