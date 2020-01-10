import React from 'react';
import { ChatContext } from 'contexts/ChatProvider';
import config from 'config';
import style from './window.module.scss';
import { Message, NewMessage } from 'components/Models';

const Controller = props => {

  const [ message, setMessage ] = React.useState('');
  const { rooms, token, fetchRooms, user, updateRoom, selectedRoom } = React.useContext(ChatContext);

  var messages = [];

  if (rooms.rooms) {
    for (let i of rooms.rooms) {
      if (i._id === selectedRoom) {
        messages = i.messages;
      }
    }
  }

  const handleNewMessage = e => {
    setMessage(e.target.value);
  }

  const handleSubmit = async e => {
    if (message.length === 0) return;

    updateRoom(selectedRoom, message);
    setMessage('');

    const send = await fetch(config.api + '/rooms/' + selectedRoom , {
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

    //if (send.status === 200) fetchRooms();
  }

  return (
    <div className={style.container}>
      <div className={style.window}>
        <ul id="messagesList">
          { messages && messages.map(msg => (
            <Message
              key={msg._id}
              username={ msg.user.username !== user.username && msg.user.username }
              right={ msg.user.username === user.username && true }
              body={msg.body}
            />
          )) }
        </ul>
      
      <NewMessage 
        onChange={handleNewMessage}
        onClick={handleSubmit}
        value={message}
      />
      </div>
    </div>
  );

}

export default Controller;