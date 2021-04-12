import React from 'react';

import { SocketContext } from './SocketContext';

function VideoPlayer({ name }) {
  const {
    callAccepted, myVideo, userVideo, callEnded, stream, call,
  } = React.useContext(SocketContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'row nowrap', justifyContent: 'center' }}>
      {stream && (
        <div className="video-container">
          <h3 style={{ marginTop: '5%' }}>{name}</h3>
          <video playsInline muted ref={myVideo} autoPlay className="video" />
        </div>
      )}
      {
        callAccepted && !callEnded && (
          <div className="video-container">
            <h3 style={{ marginTop: '5%' }}>{call.name}</h3>
            <video playsInline ref={userVideo} autoPlay className="video" />
          </div>
        )
      }

    </div>
  );
}

export default VideoPlayer;
