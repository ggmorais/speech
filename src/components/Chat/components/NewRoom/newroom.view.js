import { Button, Input, Layer } from 'components/Models';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import style from './newroom.module.scss';

const View = props => (
  <div>
    {/* <Button title="Create room" onClick={props.handleLayer} /> */}
    <div className={style.createButton} onClick={props.handleLayer}>
      <MdAdd size="40px" /> <span className={style.addTitle}>New Room</span>
    </div>
    <Layer show={props.layer}>
      <h2>{props.invite && 'Room created!'}</h2>
      { props.invite && <p className={style.roomInvite}>Send your room invitation to other people: <a href={props.invite}>{ props.invite }</a></p> }
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