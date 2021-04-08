import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from './Calendar.jsx';
// import ReactNotification from 'react-notifications-component'

const Chat = ({
  matchesPhotos, messageMode, currentMessageId, allMessages, onMessageClick, currentUser, matchesInfo,
}) => {
  const matchUserId = matchesPhotos[currentMessageId][0].user_id;
  const currentUserId = currentUser.id;
  const [inputValue, setInputValue] = useState('');
  const [calendar, clickedCalendar] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 12,
    },
  };

  const onSendClick = (e) => {
    console.log('clicked');
    axios.post(`/app/${currentUserId}/convos/${matchUserId}`, {
      message: inputValue,
    })
      .then(() => {
        setInputValue('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button type="button" onClick={onMessageClick}>Back to Inbox</button>
      {/* <ReactNotification /> */}
      <br />
      <br />
      <div id="chat-container">
        <div id="chat-images-container">
          <img className="chat-human-photo" alt="human" src={matchesPhotos[currentMessageId][0].url} />
          <img className="chat-dog-photo" alt="dog" src={matchesPhotos[currentMessageId][1].url} />
          <div id="chat-names">
            {matchesInfo[matchUserId].name}
            {' '}
            and
            {' '}
            {matchesInfo[matchUserId].dogs_info[0].name}
          </div>
        </div>
        <br />
        <br />

        <div id="direct-messages-container">
          {allMessages[matchUserId].map((message) => {
            // console.log('message', message)
            if (message.sender_id === currentUserId) {
              return (
                <React.Fragment>
                  <div className="time-stamp-user">{message.time_stamp}</div>
                  <div className="messages-from-user-container" key={message.id}>
                    {message.body}
                  </div>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment>
              <div className="time-stamp-match">{message.time_stamp}</div>
              <div className="messages-from-match-container" key={message.id}>
                {message.body}
              </div>
            </React.Fragment>
            );
          })}
        </div>

        <div id="send-message-container">
          <i onClick={() => { clickedCalendar(true); }} className="far fa-calendar-alt" />
          <Modal
            widgetname="related-products"
            ariaHideApp={false}
            isOpen={calendar}
            style={customStyles}
            onRequestClose={() => { clickedCalendar(!calendar); }}
          >
            <Calendar clickedCalendar={clickedCalendar} />
          </Modal>
          <input type="text" value={inputValue} onChange={handleInputChange} style={{ backgroundColor: '#EFF9F0' }} />
          <i className="far fa-paper-plane" onClick={onSendClick} />
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
  currentUser: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  matchesInfo: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

Chat.defaultProps = {
  matchesPhotos: [],
  allMessages: {},
  messageMode: false,
  currentMessageId: null,
  currentUser: {},
  matchesInfo: {},
};

export default Chat;
