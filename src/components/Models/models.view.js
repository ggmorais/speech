import React from 'react'
import input from './style/Input.module.scss';
import button from './style/Button.module.scss';
import layer from './style/Layer.module.scss';

const Input = props => (
  <label className={input.label}>
    <p className={input.inputName}>{props.title}</p>
    <input
      className={input.input}
      type={props.type} 
      name={props.name} 
      onChange={props.onChange}
      value={props.value}
    />
  </label>
);

const Button = props => (
  <p className={button.container}>
    <button 
      onClick={props.onClick} 
      className={ props.cancel ? button.cancel : button.done }
      style={{ 
        width: props.width && props.width,
        borderRadius: props.rounded && props.rounded
      }}
    >
      { props.title }
    </button>
  </p>
);

const Layer = props => (
  <div className={layer.cover} style={{ display: !props.show && 'none' }}>
    <div className={layer.content}>
      <div className={layer.container} style={{ padding: props.pd && props.pd }}>
        { props.children }
      </div>
    </div>
  </div>
);

export { Input, Button, Layer };

