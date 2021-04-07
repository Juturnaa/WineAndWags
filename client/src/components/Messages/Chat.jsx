import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal'
import Calendar from './Calendar.jsx'
import ReactNotification from 'react-notifications-component'

const Chat = ({
  matchesPhotos, messageMode, currentMessageId, allMessages, onMessageClick, currentUser,
}) => {
  const matchUserId = matchesPhotos[currentMessageId][0].user_id;
  const currentUserId = currentUser.id;
  const [inputValue, setInputValue] = useState('');
  const [calendar, clickedCalendar] = useState(false)

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      zIndex: 12
    }
  };

  const onSendClick = (e) => {
    console.log('clicked')
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
      <ReactNotification />
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
            <div className="direct-message-container" key={message.id}>
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
          <i onClick={()=>{clickedCalendar(true)}}className="far fa-calendar-alt" />
          <Modal widgetname="related-products"
          ariaHideApp={false}
          isOpen={calendar}
          style={customStyles}
          onRequestClose={() => {clickedCalendar(!calendar)}}>
            <Calendar clickedCalendar ={clickedCalendar}/>
          </Modal>
          <input type="text" onChange={handleInputChange} />
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
};

Chat.defaultProps = {
  matchesPhotos: [],
  allMessages: {},
  messageMode: false,
  currentMessageId: null,
  currentUser: {},
};

export default Chat;
