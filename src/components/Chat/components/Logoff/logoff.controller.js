import React from 'react';
import View from './logoff.view';

const Controller = props => {

  const handleButton = e => {
    e.preventDefault();

    localStorage.setItem('@speech/token', false);
  }

  return (
    <View handleButton={handleButton} />
  );
  
}

export default Controller;