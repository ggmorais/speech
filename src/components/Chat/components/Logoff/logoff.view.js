import React from 'react';

const View = props => {

  return (
    <div>
      <button onClick={props.handleButton}>Logout</button>
    </div>
  );

}

export default View;