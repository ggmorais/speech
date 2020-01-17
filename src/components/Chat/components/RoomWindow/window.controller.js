import dateParser from 'components/dateParser';
import { Message, NewMessage, Warning } from 'components/Models';
import { ChatContext } from 'contexts/ChatProvider';
import React, { useContext, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import style from './window.module.scss';

const Controller = props => {

  const [ message, setMessage ] = useState('');
  const [ invite, setInvite ] = useState(true);
  const { user, selectedRoom, isLoading, sendNewMessage, roomData } = useContext(ChatContext);

  var messages = [];
  
  if (roomData.length) {
    for (let i of roomData) {
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

    sendNewMessage(selectedRoom, message);
    setMessage('');
  }

  useEffect(() => {
    setInvite(true);
  }, [selectedRoom])
  
  return (
    <div className={style.container}>
      <div className={style.invite}>
        { invite && (
          <p>
            Invite other people to this room: 
            <a href={window.location.href + '#room=' + selectedRoom}>
              {window.location.href + '#room=' + selectedRoom}
            </a>
            <MdClose 
              color="red" 
              size="20px" 
              className={style.closeInvite}
              onClick={() => setInvite(invite ? false : true)}
            />
          </p>
        )}
      </div>
      <div className={style.window}>
        <div>
          <ul className={style.messageList} id="messages">
            { messages.length ? messages.map(msg => (
              <Message
                key={msg._id}
                username={ msg.user.username !== user.username && msg.user.username }
                right={ msg.user.username === user.username && true }
                body={msg.body}
                postDate={dateParser(msg.postDate)}
              />
            )) : (
              !isLoading && (
                <Warning top="25%">
                  This room does not have messages yet, be the first sanding one now!
                </Warning>
              )
            )}
          </ul>
        </div>
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