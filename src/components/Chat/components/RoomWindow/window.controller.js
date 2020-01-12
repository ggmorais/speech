import React from 'react';
import { ChatContext } from 'contexts/ChatProvider';
import config from 'config';
import style from './window.module.scss';
import { Message, NewMessage, Warning, Loading } from 'components/Models';
import dateParser from 'components/dateParser';

const Controller = props => {

  const [ message, setMessage ] = React.useState('');
  const { rooms, token, fetchRooms, user, updateRoom, selectedRoom, isLoading } = React.useContext(ChatContext);

  var messages = [];

  if (rooms.length) {
    for (let i of rooms) {
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
        { messages.length ? messages.map(msg => (
          <ul id="messagesList">
            <Message
              key={msg._id}
              username={ msg.user.username !== user.username && msg.user.username }
              right={ msg.user.username === user.username && true }
              body={msg.body}
              postDate={dateParser(msg.postDate)}
            />
          </ul>
        )) : (
          !isLoading && (
            <Warning top="25%">
              This room does not have messages yet, be the first sanding one now!
            </Warning>
          )
        )}
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