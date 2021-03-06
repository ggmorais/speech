import React, { useContext } from "react";
import View from "./list.view";
import config from "config";
import { ChatContext } from "contexts/ChatProvider";
import { Loading } from "components/Models";
import dateParser from "components/dateParser";
import style from './list.module.scss';

const Controller = props => {
  const { selectRoom, selectedRoom, user, isLoading, roomList } = useContext(ChatContext);

  const handleSelect = id => {
    selectRoom(id);
  };

  return (roomList.length) ? (
    roomList.map(room => {

      let sender, lastMessage, postDate, isSelected;
   
      if (room.messages.length > 0) {
        let last = room.messages[room.messages.length - 1];
        sender = last.user.username;
        lastMessage = last.body;
        postDate = last.postDate;

        if (sender === user.username) {
          sender = 'You';
        }

        if (lastMessage.length > 10) {
          lastMessage = lastMessage.slice(0, 11) + ' ...';
        }
      }

      return (
        <View
          {...room}
          key={room._id}
          handleSelect={handleSelect}
          isSelected={isSelected}
          username={user.username}
          sender={sender}
          lastMessage={lastMessage}
          postDate={ postDate && dateParser(postDate) }
        />
      );
    })
  ) : (
    isLoading && <Loading />
  );
};

export default Controller;
