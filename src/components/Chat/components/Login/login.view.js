import React from 'react';
import style from './login.module.scss';
import labels from 'components/scss_modules/labels.module.scss';
import { Input, Button } from 'components/Models';

const View = props => {

  return (
    <div className={style.container}>
      <p 
        className={labels.warning} 
        style={ { display: props.message ? 'block' : 'none' } }>
        { props.message }
      </p>
      <form className={style.form} onSubmit={props.handleSubmit}>
        <Input
          title="Username"
          type="text"
          name="username"
          onChange={props.handleChanges}
          value={props.changes.username}
        />
        <Input
          title="Password"
          type="password"
          name="password"
          onChange={props.handleChanges}
          value={props.changes.password}
        />
        <Button title="Login" width="80%" />
      </form>
    </div>
  );

}

export default View;