import React from 'react';
import style from './login.module.scss';
import labels from 'components/scss_modules/labels.module.scss';
import { Input, Button, Layer } from 'components/Models';

const View = props => {

  return (
    <Layer show>
        <h2>Login in your account</h2>
        <p 
          className={labels.warning} 
          style={ { display: props.message ? 'block' : 'none' } }>
          { props.message }
        </p>
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
        <Button title="Login" width="80%" onClick={props.handleSubmit} />
        <a href="/#register" onClick={() => {
          window.location.replace('/#register')
          window.location.reload();
        }}>
          Create an account
        </a>
    </Layer>
  );

}

export default View;