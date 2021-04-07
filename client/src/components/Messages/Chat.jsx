import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Chat = ({
  matchesPhotos, messageMode, currentMessageId, allMessages, onMessageClick,
}) => {
  const matchUserId = matchesPhotos[currentMessageId][0].user_id;
  // const [inputValue, setInputValue] = useState('');

  // useEffect(() => {

  // })

  return (
    <div>
      <button type="button" onClick={onMessageClick}>Back to Inbox</button>
      <br />
      <br />
      <div id="chat-container">
        <div id="chat-images-container">
          <img className="chat-human-photo" alt="human" src={matchesPhotos[currentMessageId][0].url} />
          <img className="chat-dog-photo" alt="dog" src={matchesPhotos[currentMessageId][1].url} />
          <div id="chat-names">Human and Dog</div>
        </div>
        <br />
        <br />
        <div id="direct-messages-container">
          {/* {console.log('user messages', allMessages[matchUserId])} */}
          {allMessages[matchUserId].map((message) => (
            <div className="direct-message-container">
              <div className="message-body">
                {message.body}
              </div>
              <div className="time-stamp">
                {message.time_stamp}
              </div>
            </div>
          ))}
        </div>
        <div id="send-message-container">
          <i className="far fa-calendar-alt" />
          <input type="text" />
          <i className="far fa-paper-plane" />
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
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
  messageMode: PropTypes.bool,
  currentMessageId: PropTypes.number,
};

Chat.defaultProps = {
  matchesPhotos: [],
  allMessages: {},
  messageMode: false,
  currentMessageId: null,
};

export default Chat;
