import React from 'react';
import { SocketContext } from './SocketContext';

function Options({ children }) {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = React.useContext(SocketContext);

  const [idToCall, setIdToCall] = React.useState('');

  return (
    <div>
      Options
      {children}
    </div>
  );
}

export default Options;
