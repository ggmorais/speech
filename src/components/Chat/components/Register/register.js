import React, { useState } from 'react';
import { Layer, Input, Button } from 'components/Models';
import style from './register.module.scss';
import config from 'config';


const Register = props => {

  const [ changes, setChanges ] = useState({
    username: '',
    password: ''
  });
  const [ error, setError ] = useState('');

  const handleChanges = e => {
    const { name, value } = e.target;

    setChanges({
      ...changes,
      [name]: value 
    });
  }

  const submit = async e => {
    e.preventDefault();

    if (changes.username?.length < 4 || changes.username?.length < 4) return;

    const create = await fetch(config.api + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
    })

    const status = create.status;

    if (status === 500 || status === 401) {
      return setError('Username already in use');
    }

    window.location.replace('/');
    
  }

  return (
    <>
      <Layer show>
        <p className={style.error}>{error}</p>
        <h2>Create your account</h2>
        <Input 
          type="text" 
          name="username" 
          title="Username" 
          onChange={handleChanges} 
          value={changes.username}  />
        <Input 
          type="password" 
          name="password" 
          title="Password" 
          onChange={handleChanges} 
          value={changes.password}  />
        <Button title="Create" onClick={submit} width="80%" />
        <a href="/">Log in</a>
      </Layer>
    </>
  );
}

export default Register;