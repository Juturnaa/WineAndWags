import React from 'react';
import Carousel from 'react-elastic-carousel';
import { ContextProvider, SocketContext } from './SocketContext';
import VideoPlayer from './VideoPlayer';
import Options from './Options';
import axios from 'axios';

// Thanks justine!

function Video({
  currentUser, matches, matchesPhotos, matchesInfo,
}) {
  const sessionMatches = JSON.parse(sessionStorage.getItem('matches'));
  const sessionAllMessages = JSON.parse(sessionStorage.getItem('messages'));
  const sessionMatchesInfo = JSON.parse(sessionStorage.getItem('matchesInfo'));
  const sessionMatchesPhotos = JSON.parse(sessionStorage.getItem('matchesPhotos'));
  const {
    me, callAccepted, name, setName, callEnded, leaveCall, callUser,
  } = React.useContext(SocketContext);

  console.log(currentUser.name)
  console.log(me);

  const videoInvite = (matchId) => {
    console.log('matchId', matchId)
    axios.post(`/app/${currentUser.id}/convos/${matchId}`, {
      message: `Join me for a video chat at: ${me}`,
    })
      .then(() => {
        setInputValue('');
        setMessageCount((messageCount) => messageCount + 1);
      })
      .catch((err) => console.log(err));
  };

  function MatchesCarousel() {
    return (
      <div style={{marginTop: '2%'}} id="matches-container">
        <Carousel
          disableArrowsOnEnd
          itemsToShow={5}
          itemsToScroll={5}
          transitionMs={300}
        >
          {matchesPhotos.map((match, index) => (
            <div className="match-container">
              <div className="inbox-matches-names">
                {matchesInfo[match[0].user_id].name || ''}
                {' '}
                and
                {' '}
                {matchesInfo[match[0].user_id].dogs_info[0].name}
              </div>
              <div className="match-photos-container">
                <img
                  className="human-photos"
                  alt="human"
                  src={match[0].url}
                  name={index}
                  onClick={() => videoInvite(match[0].user_id)}
                />
                <img
                  className="dog-photos"
                  alt="dog"
                  src={match[1].url}
                  name={index}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  return (
    <div>
      <MatchesCarousel
              // matchesPhotos={matchesPhotos}
        matchesPhotos={sessionMatchesPhotos}
              // matchesInfo={matchesInfo}
        matchesInfo={sessionMatchesInfo}
      />
      <VideoPlayer name={currentUser.name} />
      <Options />
    </div>
  );
}

export default Video;
