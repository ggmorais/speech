import React from 'react'
import input from './style/Input.module.scss';
import button from './style/Button.module.scss';
import layer from './style/Layer.module.scss';
import newMessage from './style/NewMessage.module.scss';
import message from './style/Message.module.scss';

const Input = props => (
  <div className={input.label}>
    <p className={input.inputName}>{props.title}</p>
    <input
      style={{ 
        borderRadius: props.rounded && props.rounded,
        width: props.width && props.width
      }}
      className={input.input}
      type={props.type} 
      name={props.name} 
      onChange={props.onChange}
      value={props.value}
    />
  </div>
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

const NewMessage = props => (
  <div className={newMessage.container}>
    <div className={newMessage.flex}>
      <input
        className={newMessage.input}
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
      <button 
        className={newMessage.button}
        onClick={props.onClick}
      >OK</button>
    </div>
  </div>
)

const Message = props => (
  <li className={message.messageInfos} style={{
    justifyContent: props.right && 'flex-end'
  }} >
    <div className={message.message}>
      <a className={message.messageOwner}>{ props.username }</a>
      <p className={message.messageBody}>{ props.body }</p>
    </div>
  </li>
);

export { Input, Button, Layer, NewMessage, Message };

