import React from 'react';
import { SocketContext } from './SocketContext';

function Options({ children }) {
  const {
    me, callAccepted, name, setName, callEnded, leaveCall, callUser,
  } = React.useContext(SocketContext);

  const [idToCall, setIdToCall] = React.useState('');
  console.log(me);
  return (
    <div>
      <div>
        {`id: ${me}`}
      </div>
      <div>
        Make a Call
      </div>
      <input
        type="text"
        value={idToCall}
        onChange={(e) => setIdToCall(e.target.value)}
      />
      {callAccepted && !callEnded ? (
        <button
          type="button"
          onClick={leaveCall}
        >
          Hang Up
        </button>
      ) : (
        <button
          type="button"
          onClick={() => callUser(idToCall)}
        >
          Call
        </button>
      )}

    </div>
  );
}

export default Options;
