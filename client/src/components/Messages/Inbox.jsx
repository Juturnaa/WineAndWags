import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import MatchesCarousel from './MatchesCarousel';

const Inbox = ({
  currentUser, matches, matchesPhotos, allMessages, matchesInfo, setMessageCount, messageCount, getAllMessages,
}) => {
  const [messageMode, setMessageMode] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);

  const sessionMatches = JSON.parse(sessionStorage.getItem('matches'));
  const sessionAllMessages = JSON.parse(sessionStorage.getItem('messages'));
  const sessionMatchesInfo = JSON.parse(sessionStorage.getItem('matchesInfo'));
  const sessionMatchesPhotos = JSON.parse(sessionStorage.getItem('matchesPhotos'));

  const onMessageClick = (e) => {
    setMessageMode(!messageMode);
    setCurrentMessageId(Number(e.target.getAttribute('name')));
  };

  const messageQueueCount = () => {
    let count = 0;
    const sessionAllMessagesKeys = Object.keys(sessionAllMessages);
    for (let i = 0; i < sessionAllMessagesKeys.length; i++) {
      if (sessionAllMessages[i] && sessionAllMessages[i].length > 0) {
        count += 1;
      }
    }
    return count;
  };

  return (
    <div id="inbox-container">
      <br />

      {!messageMode
        ? (
          <div>
            <span>
              Match Queue (
              {sessionMatches.length}
              )
            </span>
            <MatchesCarousel
              // matchesPhotos={matchesPhotos}
              matchesPhotos={sessionMatchesPhotos}
              // matchesInfo={matchesInfo}
              matchesInfo={sessionMatchesInfo}
              onMessageClick={onMessageClick}
              messageQueueCount={messageQueueCount}
            />
            <div id="messages-outer-container">
              <div id="messages-container">
                <span>
                  Message Queue (
                  {messageQueueCount()}
                  )
                </span>
                {sessionMatchesPhotos.map((match, index) => {
                  const newestMessageIndex = sessionAllMessages[match[0].user_id].length - 1;
                  if (sessionAllMessages[match[0].user_id].length !== 0) {
                    return (
                      <div className="message-container" key={match[0].user_id} name={index} onClick={onMessageClick}>
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
                          <div name={index} onClick={onMessageClick} style={{ fontWeight: 'bold' }}>
                            {sessionMatchesInfo[match[0].user_id].name}
                            {' '}
                            and
                            {' '}
                            {sessionMatchesInfo[match[0].user_id].dogs_info[0].name}
                          </div>
                          <div>
                            {(sessionAllMessages[match[0].user_id].length !== 0)
                              ? (
                                <div name={index} onClick={onMessageClick}>
                                  {sessionAllMessages[match[0].user_id][newestMessageIndex].body}
                                </div>
                              )
                              : <div name={index} onClick={onMessageClick}>Make the first move! Be bold, and write your own story...</div>}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        )
        : (
          <Chat
            matchesPhotos={sessionMatchesPhotos}
            messageMode={messageMode}
            currentMessageId={currentMessageId}
            allMessages={sessionAllMessages}
            onMessageClick={onMessageClick}
            currentUser={currentUser}
            matchesInfo={sessionMatchesInfo}
            setMessageCount={setMessageCount}
            messageCount={messageCount}
            getAllMessages={getAllMessages}
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
};

Inbox.defaultProps = {
  currentUser: {},
  dogsImg: [],
  humanPhoto: [],
  matches: [],
  matchesPhotos: [],
};

export default Inbox;
