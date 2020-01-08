import React from 'react';
import style from './newroom.module.scss';
import { Layer, Button, Input } from 'components/Models';

const View = props => (
  <div>
    <Button title="Create room" onClick={props.handleLayer} />
    <Layer show={props.layer}>
      <p>{props.layer} </p>
      <Input
        title="Room name"
        type="text"
        name="name"
        value={props.roomName}
        onChange={props.handleChanges}
      />
      <div className={style.buttons}>
        <Button cancel title="Cancel" onClick={props.handleLayer} />
        <Button title="Create" onClick={props.handleSubmit} />
      </div>
    </Layer>
  </div>
);

export default View;