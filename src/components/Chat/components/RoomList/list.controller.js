import React, { useContext } from "react";
import View from "./list.view";
import config from "config";
import { ChatContext } from "contexts/ChatProvider";
import { Loading } from "components/Models";
import dateParser from "components/dateParser";

const Controller = props => {
  const { rooms, selectRoom, selectedRoom, user } = useContext(ChatContext);

  const handleSelect = id => {
    selectRoom(id);
  };

  return rooms.length ? (
    rooms.map(room => {

      let sender, lastMessage, postDate;

      if (room.messages.length > 0) {
        sender = room.messages[room.messages.length - 1].user.username;
        lastMessage = room.messages[room.messages.length - 1].body;
        postDate = room.messages[room.messages.length - 1].postDate;

        if (lastMessage.length >= 30) {
          lastMessage = lastMessage.slice(0, 30) + ' ...';
        }

        if (room.messages[room.messages.length - 1].user.username === user.username) {
          sender = 'You';
        }
      }

      console.log(room)

      return (
        <View
          {...room}
          key={room._id}
          handleSelect={handleSelect}
          username={user.username}
          sender={sender}
          lastMessage={lastMessage}
          postDate={ postDate && dateParser(postDate) }
        />
      );
    })
  ) : (
    <Loading />
  );
};

export default Controller;
