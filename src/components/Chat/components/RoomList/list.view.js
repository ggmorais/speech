import React from "react";
import style from "./list.module.scss";

const View = props => (
  <div
    className={style.container}
    onClick={props.handleSelect.bind(this, props._id)}
  >
    <p className={style.roomName}>{props.name}</p>
    <span>
      {props.messages.length > 0 &&
        props.messages[props.messages.length - 1].body}
    </span>
  </div>
);

export default View;
