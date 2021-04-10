import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from './Calendar.jsx';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Video from '../Video/Video';
// import ReactNotification from 'react-notifications-component'

const Chat = ({
  matchesPhotos, messageMode, currentMessageId, allMessages, onMessageClick, currentUser, matchesInfo, setMessageCount, messageCount,
}) => {
  const matchUserId = matchesPhotos[currentMessageId][0].user_id;
  const currentUserId = currentUser.id;
  // const sessionAllMessages = JSON.parse(sessionStorage.getItem('messages'));

  const [inputValue, setInputValue] = useState('');
  const [calendar, clickedCalendar] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (calendar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [calendar]);

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      height: "44em",
      width: "60em",
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      background            : "#EFF9F0",
      zIndex: 12
    }
  };

  const onSendClick = (e) => {
    console.log('clicked');
    axios.post(`/app/${currentUserId}/convos/${matchUserId}`, {
      message: inputValue,
    })
      .then(() => {
        setInputValue('');
        setMessageCount((messageCount) => messageCount + 1);
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
                  <div className="messages-from-user-container" key={message.id}>
                    {message.body}
                  </div>
                  <div className="time-stamp-user">{message.to_char}</div>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment>
              <div className="messages-from-match-container" key={message.id}>
                {message.body}
              </div>
              <div className="time-stamp-match">{message.to_char}</div>
            </React.Fragment>
            );
          })}
        </div>

        <div id="send-message-container">
          <i onClick={()=>{clickedCalendar(true)}}className="far fa-calendar-alt" />
          <Modal widgetname="related-products"
          ariaHideApp={false}
          isOpen={calendar}
          style={customStyles}
          onRequestClose={() => {clickedCalendar(!calendar)}}>
            <Calendar clickedCalendar ={clickedCalendar} currentUserId={currentUserId} matchUserId={matchUserId} currentUser={currentUser}/>
          </Modal>
          <VideoCallIcon style={{marginLeft: '1%'}}
            onClick={() => location.href = '/video' }/>
          <input type="text" className="send-message-input" value={inputValue} onChange={handleInputChange} style={{ backgroundColor: '#EFF9F0', border: 'none', width: '700px' }} />
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
  messageMode: false,
  currentMessageId: null,
  currentUser: {},
};

export default Chat;
