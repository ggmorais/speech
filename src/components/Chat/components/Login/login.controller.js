import React from 'react';
import View from './login.view';
import config from 'config.js';

const Controller = props => {

  const [changes, setChanges] = React.useState({username: '', password: ''});
  const [message, setMessage] = React.useState('');

  const handleChanges = e => {
    const { name, value } = e.target;

    // Cancel if the value not pre-exist
    if (typeof changes[name] === 'undefined') return;

    setChanges({
      ...changes,
      [name]: value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const login = await fetch(config.api + '/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(changes)
    });

    const { status } = login;
    const { message, token } = await login.json()

    if (status === 401) {
      // Wrong credentials
      setMessage(message);
      setChanges({username: '', password: ''});
    } else if (status === 200) {
      // Logged successfully
      localStorage.setItem('@speech/token', token);
      props.show(false);
    }
  }

  return (  
    <View 
      changes={changes}
      handleChanges={handleChanges}
      handleSubmit={handleSubmit}
      message={message}
    />
  );

}

export default Controller;