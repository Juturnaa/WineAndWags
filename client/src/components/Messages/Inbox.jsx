import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Chat from './Chat';
import MatchesCarousel from './MatchesCarousel';

const Inbox = ({
  currentUser, matches, matchesPhotos, allMessages, matchesInfo, setMessageCount, messageCount, getAllMessages, setAllMessages,
}) => {
  const [messageMode, setMessageMode] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);

  let humanPhoto = '';
  let dogPhoto = '';

  const onMessageClick = (e) => {
    setMessageMode(!messageMode);
    setCurrentMessageId(Number(e.target.getAttribute('name')));
    axios.patch(`/app/${currentUser.id}/convos/`, {
      message_id: e.target.getAttribute('data-id'),
    });
  };

  const getProfilePhotos = (matchPics) => {
    for (let i = 0; i < matchPics.length; i++) {
      if (matchPics[i].dog_id === null) {
        humanPhoto = matchPics[i].url;
        break;
      }
    }
    for (let j = 0; j < matchPics.length; j++) {
      if (matchPics[j].dog_id !== null) {
        dogPhoto = matchPics[j].url;
        break;
      }
    }
  };

  const messageQueueCount = () => {
    let count = 0;
    const allMessageKeys = Object.keys(allMessages);
    for (let i = 0; i < allMessageKeys.length; i++) {
      if (allMessages[allMessageKeys[i]].length > 0) {
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
              {matches.length}
              )
            </span>
            <MatchesCarousel
              matchesPhotos={matchesPhotos}
              matchesInfo={matchesInfo}
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
                {Object.keys(allMessages).length !== 0
                  ? matchesPhotos.map((match, index) => {
                    const newestMessageIndex = allMessages[match[0].user_id].length - 1;
                    if (allMessages[match[0].user_id].length !== 0) {
                      return (
                        <div className="message-container" key={match[0].user_id} name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                          <div className="messages-photos-container" name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                          {getProfilePhotos(match)}
                            <img
                              className="human-photos-small"
                              alt="human"
                              src={humanPhoto}
                              name={index}
                              data-id={allMessages[match[0].user_id][newestMessageIndex].id}
                              onClick={onMessageClick}
                            />
                            <img
                              className="dog-photos-small"
                              alt="dog"
                              src={dogPhoto}
                              name={index}
                              data-id={allMessages[match[0].user_id][newestMessageIndex].id}
                              onClick={onMessageClick}
                            />
                          </div>
                          <div className="name-message-container" name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                            <div name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick} style={{ fontWeight: 'bold' }}>
                              {matchesInfo[match[0].user_id].name}
                              {' '}
                              and
                              {' '}
                              {matchesInfo[match[0].user_id].dogs_info[0].name}
                            </div>

                            {/* ---------Most recent message------------ */}
                            {((allMessages[match[0].user_id][newestMessageIndex].sender_id !== currentUser.id) && (allMessages[match[0].user_id][newestMessageIndex].opened === false))
                              ? (
                                <div className="unread-message-container">
                                  <div name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} className="unread-message" onClick={onMessageClick}>
                                    {/* {console.log('newest message', allMessages[match[0].user_id][newestMessageIndex])} */}
                                    {allMessages[match[0].user_id][newestMessageIndex].body}
                                  </div>
                                  <i className="fas fa-circle fa-xs" />
                                </div>
                              )
                              : (
                                <div name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                                  {allMessages[match[0].user_id][newestMessageIndex].body}
                                </div>
                              )}

                          </div>
                        </div>
                      );
                    }
                  })
                  : null}
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
            currentUser={currentUser}
            matchesInfo={matchesInfo}
            setMessageCount={setMessageCount}
            messageCount={messageCount}
            getAllMessages={getAllMessages}
            setAllMessages={setAllMessages}
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
