import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Inbox = ({ matches, matchesPhotos }) => {
  // console.log('matches', matches);
  // console.log('matchesPhotos', matchesPhotos);
  const [messageMode, setMessageMode] = useState(false);

  const onMessageClick = () => {
    setMessageMode(!messageMode);
  };

  const renderMessageMode = () => (
    <div>
      <button type="button" onClick={onMessageClick}>Back to Inbox</button>
      DMs HERE
    </div>
  );

  return (
    <div id="inbox-container">
      <br />
      {!messageMode
        ? (
          <div>
            <div id="matches-container">
              {matchesPhotos.map((match) => (
                <div className="match-container" key={match[0].user_id}>
                  <span>Human and Dog</span>
                  <br />
                  <div className="match-photos-container">
                    <img
                      className="human-photos"
                      alt="human"
                      src={match[0].url}
                    />
                    <img
                      className="dog-photos"
                      alt="dog"
                      src={match[1].url}
                    />
                  </div>
                </div>
              ))}
            </div>
            <br />
            <br />
            <div id="messages-outer-container">
              <div id="messages-container" onClick={onMessageClick}>
                Inbox HERE:
                {matchesPhotos.map((match) => (
                  <div className="message-container" key={match[0].user_id}>
                    <div className="messages-photos-container">
                      <img
                  className="human-photos-small"
                  alt="human"
                  src={match[0].url}
                />
                      <img
                  className="dog-photos-small"
                  alt="dog"
                  src={match[1].url}
                />
                    </div>
                    Make the first move! Be bold, write your own story, and get ready to meet the person and dog of your dreams...
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        : renderMessageMode()}
    </div>
  );
};

Inbox.propTypes = {
  currentUser: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  dogsImg: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  humanPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  matches: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  matchesPhotos: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

Inbox.defaultProps = {
  currentUser: {},
  dogsImg: [],
  humanPhoto: [],
  matches: [],
  matchesPhotos: [],
};

export default Inbox;
