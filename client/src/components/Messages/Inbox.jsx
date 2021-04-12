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

  const sessionMatches = JSON.parse(sessionStorage.getItem('matches'));
  const sessionAllMessages = JSON.parse(sessionStorage.getItem('messages'));
  const sessionMatchesInfo = JSON.parse(sessionStorage.getItem('matchesInfo'));
  const sessionMatchesPhotos = JSON.parse(sessionStorage.getItem('matchesPhotos'));
  let newestMessageId = 0;

  console.log('matches', matchesPhotos)

  const onMessageClick = (e) => {
    setMessageMode(!messageMode);
    setCurrentMessageId(Number(e.target.getAttribute('name')));
    console.log('message id', e.target.getAttribute('data-id'));
    axios.patch(`/app/${currentUser.id}/convos/`, {
      message_id: e.target.getAttribute('data-id'),
    });
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   const messages = {};
  //   matches.map((match) => {
  //     axios.get(`/app/${currentUser.id}/convos/${match.user_id}`)
  //       .then((results) => {
  //         if (isMounted) {
  //           messages[match.user_id] = results.data;
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   });
  //   setAllMessages(messages);
  //   return () => { isMounted = false; };
  // }, [dmSent]);
  // useEffect(() => {
  //   getAllMessages();
  // }, []);

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
                  const newestMessageIndex = allMessages[match[0].user_id].length - 1;
                  if (allMessages[match[0].user_id].length !== 0) {
                    return (
                      <div className="message-container" key={match[0].user_id} name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                        <div className="messages-photos-container" name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                          <img
                            className="human-photos-small"
                            alt="human"
                            src={match[0].url}
                            name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id}
                            onClick={onMessageClick}
                          />
                          <img
                            className="dog-photos-small"
                            alt="dog"
                            src={match[1].url}
                            name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id}
                            onClick={onMessageClick}
                          />
                        </div>
                        <div className="name-message-container" name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                          <div name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick} style={{ fontWeight: 'bold' }}>
                            {sessionMatchesInfo[match[0].user_id].name}
                            {' '}
                            and
                            {' '}
                            {sessionMatchesInfo[match[0].user_id].dogs_info[0].name}
                          </div>

                          {/* ---------Most recent message------------ */}
                          {((allMessages[match[0].user_id][newestMessageIndex].sender_id !== currentUser.id) && (allMessages[match[0].user_id][newestMessageIndex].opened === false))
                            ? (
                              <div className="unread-message-container">
                                <div name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} className="unread-message" onClick={onMessageClick}>
                                  {console.log('newest message', allMessages[match[0].user_id][newestMessageIndex])}
                                  {allMessages[match[0].user_id][newestMessageIndex].body}
                                </div>
                                <i className="fas fa-circle fa-xs" />
                              </div>
                            )
                            : (
                              <div name={index} data-id={allMessages[match[0].user_id][newestMessageIndex].id} onClick={onMessageClick}>
                                {console.log('newest message', allMessages[match[0].user_id][newestMessageIndex])}
                                {allMessages[match[0].user_id][newestMessageIndex].body}
                              </div>
                            )}

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
            allMessages={allMessages}
            onMessageClick={onMessageClick}
            currentUser={currentUser}
            matchesInfo={sessionMatchesInfo}
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
