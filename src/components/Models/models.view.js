import React from 'react'
import style from './models.module.scss';

const Input = props => (
  <label className={style.label}>
    <p className={style.inputName}>{props.title}</p>
    <input
      className={style.input}
      type={props.type} 
      name={props.name} 
      onChange={props.onChange}
      value={props.value}
    />
  </label>
);

export { Input };

