import React from 'react'
import style from './enter.module.scss';
import labels from 'components/scss_modules/labels.module.scss';
import { Input, Button, Layer } from 'components/Models';

const View = props => (
  <div>
    <Button title="Enter room" onClick={props.handleLayer} />
    <Layer show={props.layer}>
      {/* <div className={style.form} > */}
        <Input
          type="text"
          name="roomId"
          title="Room ID"
          onChange={props.handleChanges}
        />
        <div className={style.buttons}>
          <Button cancel title="Cancel" onClick={props.handleLayer} />
          <Button title="Enter" onClick={props.handleSubmit} />
        </div>
      {/* </div> */}
    </Layer>
  </div>
);

export default View;
