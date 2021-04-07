import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Inbox = ({
  currentUser, matches, matchesPhotos, allMessages,
}) => {
  // console.log('matches', matches);
  // console.log('currentUser', currentUser.id);
  console.log('matchesPhotos', matchesPhotos);
  const [messageMode, setMessageMode] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(0);

  const onMessageClick = (e) => {
    setMessageMode(!messageMode);
    console.log(e.target);
    setCurrentMessageId(e.target.getAttribute('name'));
  };

  const renderMessageMode = () => (
    <div>
      <button type="button" onClick={onMessageClick}>Back to Inbox</button>
      <br />
      <br />
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
                <div className="match-container" key={match[0].user_id} name={(match[0].user_id)} onClick={onMessageClick}>
                  <span>Human and Dog</span>
                  <br />
                  <div className="match-photos-container" >
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
              <div id="messages-container">
                Message Queue (
                {matches.length}
                )
                {matchesPhotos.map((match) => (
                  <div className="message-container" key={match[0].user_id} name={match[0].user_id} onClick={onMessageClick}>
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
                    <div className="name-message-container">
                      {/* {console.log('allmessages at userid', allMessages[match[0].user_id])} */}
                      <div>
                        <b>Human name and Dog name</b>
                      </div>
                      <div>
                        {(allMessages[match[0].user_id].length !== 0)
                          ? (
                            <div>
                              {allMessages[match[0].user_id][0].body}
                            </div>
                          )
                          : <span>Make the first move! Be bold, and write your own story...</span>}
                      </div>
                    </div>
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
  allMessages: PropTypes.objectOf(
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
  allMessages: {},
};

export default Inbox;
