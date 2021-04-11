/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, NavLink, Link,
} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SignalCellularConnectedNoInternet4BarRounded } from '@material-ui/icons';
import Homepage from './Homepage/Homepage';
import EditProfile from './Homepage/EditProfile';
import Inbox from './Messages/Inbox';
import Map from './Map/Map';
import Video from './Video/Video';
import { ContextProvider } from './Video/SocketContext';

// https://reactrouter.com/web/api/Redirect may need to use <Redirect> once logins are setup
// example:
// <Route exact path="/">
//  {loggedIn ? <Redirect to="/home" /> : <LandingPage />}
// </Route>

function NavBar({
  currentUser, setLanding, setCurrentUser, likeProfile, humanPhoto, breeds, dogsImg, currentDogs, getRandomUser, matches, matchesPhotos, likePhoto, allMessages, currentUserID, potiential, potientialDog, editProfileBtn, setBtn, showNotifs, setShowNotifs, matchesInfo, setMessageCount, messageCount, potientialDogsImg, getAllMessages, setAllMessages, setDogsPhoto, setHumanPhoto,
}) {
  const [notifs, setNotifs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [human, setHuman] = useState(true);
  const [dogs, setDogs] = useState(false);
  const [unread, setUnread] = useState(0);

  const logMeOut = () => {
    localStorage.clear();
    setLanding(true);
    setCurrentUser(null);
    location.href = '/home';
  };

  const changeHuman = () => {
    setHuman(true);
    setDogs(false);
    setEdit(false);
  };

  const changeDogs = () => {
    setHuman(false);
    setDogs(true);
    setEdit(false);
  };

  const getNotifs = () => {
    axios.get(`/app/notifications/${currentUserID}`)
      .then((data) => {
        let counter = 0;
        data.data.forEach((result) => { if (!result.read) counter++; });
        setNotifs(data.data);
        setUnread(counter);
      });
  };
  const updateNotif = (notif_id) => {
    axios.patch(`/app/notifications/${notif_id}`)
      .then(() => {
        getNotifs();
      });
  };
  useEffect(() => {
    getNotifs();
  }, []);

  return (
    <BrowserRouter>
      <nav className="navigation-bar">
        <div className="navbar-title-content">
          <div className="navbar-title">
            <h2>Wine and Wags</h2>
            <h2>Wine and Wags</h2>
          </div>
        </div>
        <div className="nav-icons">
          <NavLink className="nav-icon" exact to="/home" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="fas fa-home" /></NavLink>
          <button style={{ background: 'none', border: 'none' }} className="nav-icon" onClick={() => { setShowNotifs(!showNotifs); setEdit(false); }}><i className="far fa-bell" /></button>
          <NavLink className="nav-icon" exact to="/inbox" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="far fa-envelope" /></NavLink>
          {/* <NavLink className="nav-icon" exact to="/video" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="fas fa-video" /></NavLink> */}
          <NavLink className="nav-icon" exact to="/map" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="far fa-map" /></NavLink>
          <a className="nav-icon" onClick={() => { setEdit(!edit); setShowNotifs(false); }}>
            {humanPhoto.length ? (
              <div
                className="profile-thumbnail"
                style={{ backgroundImage: `url(${humanPhoto[0].url})` }}
              />
            )
              : <div className="profile-thumbnail" />}
          </a>
          {edit
            ? (
              <div style={{ padding: '1.5em' }}>
                <div id="editNav">
                  <div id="editNav-triangle" />
                  <Dropdown.Item as={Link} to="/editprofile" onClick={changeHuman}>Edit Me</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/editprofile" onClick={changeDogs}>Edit my dog(s)</Dropdown.Item>
                  <Dropdown.Item onClick={logMeOut}>Logout</Dropdown.Item>
                </div>
              </div>
            )
            : null}
        </div>
      </nav>
      {unread > 0
        ? (
          <div className="notifs-icon">
            <div className="notifs-circle">{unread}</div>
          </div>
        )
        : ''}
      {showNotifs
        ? (
          <div className="notifs">
            <div className="notifs-triangle" />
            <div className="notifs-title">Notifications</div>
            <div className="notifs-content">
              {notifs.map((notif, i) => {
                let txt;
                if (notif.type === 'photoLike') txt = ' liked your photo';
                else if (notif.type === 'message') txt = ' sent you a message';
                else if (notif.type === 'appointment') txt = ' planned a date with you';
                else if (notif.type === 'match') txt = ' matched with you';
                else if (notif.type === 'video') txt = ' called you';
                if (notif.read) {
                  return (
                    <div className="read-notif">
                      {notif.sender_name}
                      {txt}
                    </div>
                  );
                }
                return (
                  <div className="unread-notif" onClick={() => updateNotif(notif.id)}>
                    {notif.sender_name}
                    {txt}
                  </div>
                );
              })}
            </div>
          </div>
        )
        : ''}
      {/* Routes */}
      <Switch>
        <Route
          exact
          path="/inbox"
          render={() => (
            <Inbox
              currentUser={currentUser}
              humanPhoto={humanPhoto}
              dogsImg={dogsImg}
              matches={matches}
              matchesPhotos={matchesPhotos}
              allMessages={allMessages}
              matchesInfo={matchesInfo}
              getAllMessages={getAllMessages}
              setAllMessages={setAllMessages}
            />
          )}
        />
        <Route exact path="/map" render={() => <Map currentUser={currentUser} />} />
        <Route exact path="/editprofile" render={() => <EditProfile currentUser={currentUser} humanPhoto={humanPhoto} dogsImg={dogsImg} breeds={breeds} human={human} dogs={dogs} changeHuman={changeHuman} changeDogs={changeDogs} setEdit={setEdit} currentUserID={currentUserID} setDogsPhoto={setDogsPhoto} setHumanPhoto={setHumanPhoto} />} />
        <Route
          exact
          path="/video"
          render={() => (
            <ContextProvider>
              <Video
                currentUser={currentUser}
                humanPhoto={humanPhoto}
                dogsImg={dogsImg}
                matches={matches}
                matchesPhotos={matchesPhotos}
                matchesInfo={matchesInfo}
              />
            </ContextProvider>
          )}
        />
        <Route path="/*" render={() => <Homepage likePhoto={likePhoto} likeProfile={likeProfile} getRandomUser={getRandomUser} currentUser={currentUser} humanPhoto={humanPhoto} dogPhotos={dogsImg} currentDogs={currentDogs} currentUserID={currentUserID} potiential={potiential} potientialDogsImg={potientialDogsImg} potientialDog={potientialDog || ''} />} />
      </Switch>
    </BrowserRouter>
  );
}

NavBar.propTypes = {
  currentUser: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  humanPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  breeds: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  dogsImg: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  matches: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  currentDogs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

NavBar.defaultProps = {
  currentUser: {},
  humanPhoto: [],
  breeds: [],
  currentDogs: [],
  dogsImg: [],
  matches: [],
};

export default NavBar;

{ /* <NavLink className="nav-icon" exact to="/editprofile" onClick={() => setEdit(true)}> */ }
{ /* {humanPhoto.length ? (
    <div
      className="profile-thumbnail"
      style={{ backgroundImage: `url(${humanPhoto[0].url})` }}
    />
  )
    : <div className="profile-thumbnail" />} */ }
{ /* </NavLink> */ }
