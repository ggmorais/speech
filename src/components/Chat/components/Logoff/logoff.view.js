import React from 'react';
import { Button } from 'components/Models';

const View = props => {

  return (
    <div>
      <Button cancel title="Log out" onClick={props.handleButton} />
    </div>
  );

}

export default View;