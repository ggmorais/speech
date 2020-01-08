import React from 'react';
import { ChatContext } from 'contexts/ChatProvider';
import config from 'config';
import style from './window.module.scss';
import { Message, NewMessage } from 'components/Models';

const Controller = props => {

  const [ message, setMessage ] = React.useState('');
  const { rooms, token, user } = React.useContext(ChatContext);
  const roomId = localStorage.getItem('@speech/roomId'); 

  var messages = [];

  if (rooms.rooms) {
    for (let i of rooms.rooms) {
      if (i._id === roomId) {
        messages = i.messages;
      }
    }
  }

  const handleNewMessage = e => {
    setMessage(e.target.value);
  }

  const handleSubmit = async e => {
    const send = await fetch(config.api + '/rooms/' + roomId , {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user._id,
        body: message
      })
    });

    const response = await send.json();

    console.log(response);
  }

  React.useState(() => {
    
  }, []);

  console.log(messages)

  return (
    <div className={style.container}>
      <div className={style.window}>
        { messages && messages.map(msg => (
          <Message
            key={msg._id}
            username={msg.user.username}
            body={msg.body}
          />
        )) }
      </div>
      <NewMessage 
        onChange={handleNewMessage}
        onClick={handleSubmit}
        value={message}
      />
    </div>
  );

}

export default Controller;