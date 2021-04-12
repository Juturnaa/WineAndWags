import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from './Calendar.jsx';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Video from '../Video/Video';
// import ReactNotification from 'react-notifications-component'

const Chat = ({
  matchesPhotos, messageMode, currentMessageId, allMessages, onMessageClick, currentUser, matchesInfo, setMessageCount, messageCount, getAllMessages, setAllMessages,
}) => {
  const matchUserId = matchesPhotos[currentMessageId][0].user_id;
  const currentUserId = currentUser.id;
  // const sessionAllMessages = JSON.parse(sessionStorage.getItem('messages'));

  const [inputValue, setInputValue] = useState('');
  const [calendar, clickedCalendar] = useState(false);
  const [messages, setMessages] = useState([]);
  const [dmSent, setDmSent] = useState(0);

  const getMessages = () => {
    axios.get(`/app/${currentUserId}/convos/${matchUserId}`)
      .then((results) => {
        setMessages(results.data);
        setDmSent((dmSent) => dmSent + 1);
        allMessages[matchUserId] = results.data;
      })
      .then(() => {
        window.sessionStorage.setItem('messages', JSON.stringify(allMessages));
      })
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    getMessages();
  }, []);


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
    axios.post(`/app/${currentUserId}/convos/${matchUserId}`, {
      message: inputValue,
    })
      .then((results) => {
        setInputValue('');
        getMessages();
        setMessageCount((messageCount) => messageCount + 1);
        const convo_id = results.data[0].convo_id;
        axios.post(`/app/notifications/${currentUserId}`, {
          type: 'message',
          type_id: convo_id,
          sender_name: currentUser.name,
          recipient_id: matchUserId,
        })
          .then(() => {
            console.log('Notification sent!');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button type="button" className="back-to-inbox-button" onClick={onMessageClick}><i class="fas fa-long-arrow-alt-left" /> Inbox</button>
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
          {messages.map((message) => {
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
