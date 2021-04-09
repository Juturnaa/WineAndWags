import React from 'react';
import { ContextProvider } from './SocketContext';
import VideoPlayer from './VideoPlayer';

function Video() {
  return (
    <div>
      <VideoPlayer />
    </div>
  );
}

export default Video;
