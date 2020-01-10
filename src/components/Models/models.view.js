import React from 'react'
import input from './style/Input.module.scss';
import button from './style/Button.module.scss';
import layer from './style/Layer.module.scss';
import newMessage from './style/NewMessage.module.scss';
import message from './style/Message.module.scss';
import loading from './style/Loading.module.scss';
import warning from './style/Warning.module.scss';

export const Input = props => (
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

export const Button = props => (
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

export const Layer = props => (
  <div className={layer.cover} style={{ display: !props.show && 'none' }}>
    <div className={layer.content}>
      <div className={layer.container} style={{ padding: props.pd && props.pd }}>
        { props.children }
      </div>
    </div>
  </div>
);

export const NewMessage = props => (
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

export const Message = props => (
  <li className={message.messageInfos} style={{
    justifyContent: props.right && 'flex-end'
  }} >
    <div className={message.message}>
      <a className={message.messageOwner}>{ props.username }</a>
      <p className={message.messageBody}>{ props.body } <span className={message.postDate}>{props.postDate}</span></p>
    </div>
  </li>
);

export const Loading = props => (
  <div 
    className={loading.container}
    style={{ 
      height: props.size && props.size,
      width: props.use && props.use,
      display: props.hide && 'none',
      marginTop: props.top && props.top,
      marginLeft: props.left && props.left,
      marginRight: props.right && props.right,
      marginBottom: props.bottom && props.bottom
    }}
  ></div>
)

export const Warning = props => (
  <div className={warning.container} style={{
    marginTop: props.top && props.top
  }}>
    { props.children }
  </div>
)

