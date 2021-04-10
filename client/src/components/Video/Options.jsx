import React from 'react';
import { SocketContext } from './SocketContext';

function Options({ children }) {
  const {
    me, callAccepted, name, setName, callEnded, leaveCall, callUser,
  } = React.useContext(SocketContext);

  const [idToCall, setIdToCall] = React.useState('');
  console.log(me);
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
      <div>
        {`id: ${me}`}
      </div>
      <div>
        Make a Call
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}} >
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
          <i className="fas fa-phone-slash"></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => callUser(idToCall)}
        >
          <i className="fas fa-phone"></i>
        </button>
      )}
      </div>


    </div>
  );
}

export default Options;
