import React, { useContext } from "react";
import View from "./list.view";
import config from "config";
import { ChatContext } from "contexts/ChatProvider";
import { Loading } from "components/Models";

const Controller = props => {
  const { rooms, selectRoom, selectedRoom } = useContext(ChatContext);

  const handleSelect = id => {
    selectRoom(id);
  };

  return rooms.rooms ? (
    rooms.rooms.map(room => (
      <View {...room} key={room._id} handleSelect={handleSelect} />
    ))
  ) : (
    <Loading />
  );
};

export default Controller;
