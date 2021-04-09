import React from 'react';

import { SocketContext } from './SocketContext';

function VideoPlayer() {
  const {
    name, callAccepted, myVideo, userVideo, callended, stream, call,
  } = React.useContext(SocketContext);
  return (
    <div>
      {stream && (
        <div className="my-video">
          <h5>{name || 'name'}</h5>
          <video playsInline muted ref={myVideo} autoPlay className="video" />
        </div>
      )}
      {
        callAccepted && !callEnded && (
          <div className="user-video">
            <h5>{call.name}</h5>
            <video playsInline ref={userVideo} autoPlay className="video" />
          </div>
        )
      }

    </div>
  );
}

export default VideoPlayer;
