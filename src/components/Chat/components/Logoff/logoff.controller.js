import { ChatContext } from 'contexts/ChatProvider';
import React, { useContext, useState } from 'react';
import { MdFace } from 'react-icons/md';
import style from './logoff.module.scss';

const Controller = props => {

  const { user } = useContext(ChatContext);
  const [ options, setOptions ] = useState(false);

  const handleExit = e => {
    e.preventDefault();

    localStorage.setItem('@speech/token', false);
    window.location.reload();
  }

  return (
    <div className={style.container}>
      <MdFace size="40px" className={style.face} />
      <p 
        className={style.username} 
        onClick={() => setOptions(options ? false : true)}>
          {user.username}
      </p>
      {options && (
        <div className={style.options}>
          <p onClick={handleExit}>Logout</p>
        </div>
      )}
    </div>
  );
  
}

export default Controller;