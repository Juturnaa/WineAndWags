import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

const Inbox = ({
  currentUser, matches, matchesPhotos, allMessages,
}) => {
  // console.log('matches', matches);
  // console.log('currentUser', currentUser.id);
  // console.log('matchesPhotos', matchesPhotos);
  const [messageMode, setMessageMode] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(0);

  const onMessageClick = (e) => {
    setMessageMode(!messageMode);
    // console.log('currentMessageId', e.target.getAttribute('name'));
    setCurrentMessageId(e.target.getAttribute('name'));
  };

  const renderMessageMode = () => {
    const matchUserId = matchesPhotos[currentMessageId][0].user_id;
    return (
      <div>
        <button type="button" onClick={onMessageClick}>Back to Inbox</button>
        <br />
        <br />
        DMs HERE
        {console.log('matchesphotos', matchUserId)}
        <img alt="human" src={matchesPhotos[currentMessageId][0].url} />
        <img alt="dog" src={matchesPhotos[currentMessageId][1].url} />
      </div>
    );
  };

  return (
    <div id="inbox-container">
      <br />
      {!messageMode
        ? (
          <div>
            <div id="matches-container">
              {matchesPhotos.map((match, index) => (
                <div className="match-container" key={match[0].user_id}>
                  <span>Human and Dog</span>
                  <br />
                  <div className="match-photos-container">
                    <img
                      className="human-photos"
                      alt="human"
                      src={match[0].url}
                      name={index}
                      onClick={onMessageClick}
                    />
                    <img
                      className="dog-photos"
                      alt="dog"
                      src={match[1].url}
                      name={index}
                      onClick={onMessageClick}
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
                {matchesPhotos.map((match, index) => (
                  <div className="message-container" key={match[0].user_id} name={match[0].user_id} onClick={onMessageClick}>
                    <div className="messages-photos-container" name={index} onClick={onMessageClick}>
                      <img
                        className="human-photos-small"
                        alt="human"
                        src={match[0].url}
                        name={index}
                        onClick={onMessageClick}
                      />
                      <img
                        className="dog-photos-small"
                        alt="dog"
                        src={match[1].url}
                        name={index}
                        onClick={onMessageClick}
                      />
                    </div>
                    <div className="name-message-container" name={index} onClick={onMessageClick}>
                      {/* {console.log('allmessages at userid', allMessages[match[0].user_id])} */}
                      <div name={index} onClick={onMessageClick} style={{ fontWeight: 'bold' }}>Human name and Dog name</div>
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
        : (
          <Chat
            matchesPhotos={matchesPhotos}
            messageMode={messageMode}
            currentMessageId={currentMessageId}
            allMessages={allMessages}
            onMessageClick={onMessageClick}
          />
        )}
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
