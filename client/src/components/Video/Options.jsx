import React from 'react';
import { SocketContext } from './SocketContext';

function Options({ username }) {
  const {
    me, callAccepted, name, setName, callEnded, leaveCall, callUser, answerCall, call,
  } = React.useContext(SocketContext);

  const [idToCall, setIdToCall] = React.useState('');

  React.useEffect(() => {
    setName(username);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <div>
        {`id: ${me}`}
      </div>
      <div>
        Make a Call
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
            <i className="fas fa-phone-slash" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => callUser(idToCall)}
          >
            <i className="fas fa-phone" />
          </button>
        )}
        {call.isReceivedCall && !callAccepted && (
          <button
            type="button"
            onClick={answerCall}
          >
            Answer Call
          </button>
        )}
      </div>
    </div>
  );
}

export default Options;
