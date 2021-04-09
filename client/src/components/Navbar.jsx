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

// https://reactrouter.com/web/api/Redirect may need to use <Redirect> once logins are setup
// example:
// <Route exact path="/">
//  {loggedIn ? <Redirect to="/home" /> : <LandingPage />}
// </Route>

function NavBar({
  currentUser, potientialDogsImg, likeProfile, humanPhoto, breeds, dogsImg, currentDogs, getRandomUser, matches, matchesPhotos, likePhoto, allMessages, currentUserID, potiential, potientialDog, showNotifs, setShowNotifs, matchesInfo,
}) {
  const [notifs, setNotifs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [human, setHuman] = useState(false);
  const [dogs, setDogs] = useState(false);
  const [unread, setUnread] = useState(0);

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
        console.log('updated');
      });
  };
  useEffect(() => {
    getNotifs();
  }, []);

  return (
    <BrowserRouter>
      <div className="navbar-title-content">
        <div className="navbar-title">
          <h2>Wine and Wags</h2>
          <h2>Wine and Wags</h2>
        </div>
      </div>
      <nav className="navigation-bar">
        <NavLink className="nav-icon" exact to="/home" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="fas fa-home" /></NavLink>
        <button style={{ background: 'none', border: 'none' }} className="nav-icon" onClick={() => { setShowNotifs(!showNotifs); setBtn(true); }}><i className="far fa-bell" /></button>
        <NavLink className="nav-icon" exact to="/inbox" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="far fa-envelope" /></NavLink>
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
              <div id="editNav-triangle" />
              <div id="editNav">
                <Dropdown.Item as={Link} to="/editprofile" onClick={changeHuman}>Edit Me</Dropdown.Item>
                <Dropdown.Item as={Link} to="/editprofile" onClick={changeDogs}>Edit my dog(s)</Dropdown.Item>
              </div>
            </div>
          )
          : null}
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
            />
          )}
        />
        <Route exact path="/map" render={() => <Map currentUser={currentUser} />} />
        <Route exact path="/editprofile" render={() => <EditProfile currentUser={currentUser} humanPhoto={humanPhoto} dogsImg={dogsImg} breeds={breeds} human={human} dogs={dogs} changeHuman={changeHuman} changeDogs={changeDogs} setEdit={setEdit} />} />
        <Route path="/*" render={() => <Homepage likePhoto={likePhoto} likeProfile={likeProfile} getRandomUser={getRandomUser} currentUser={currentUser} humanPhoto={humanPhoto} dogPhotos={dogsImg} currentDogs={currentDogs} currentUserID={currentUserID} potiential={potiential} potientialDog={potientialDog || ''} />} />
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
  allMessages: PropTypes.objectOf(
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

NavBar.defaultProps = {
  currentUser: {},
  humanPhoto: [],
  breeds: [],
  currentDogs: [],
  dogsImg: [],
  matches: [],
  allMessages: {},
  matchesInfo: {},
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
