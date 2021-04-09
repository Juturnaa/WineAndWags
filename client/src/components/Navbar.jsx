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
import Homepage from './Homepage/Homepage';
import EditProfile from './Homepage/EditProfile';
import Inbox from './Messages/Inbox';
import Map from './Map/Map';

// https://reactrouter.com/web/api/Redirect may need to use <Redirect> once logins are setup
// example:
// <Route exact path="/">
//  {loggedIn ? <Redirect to="/home" /> : <LandingPage />}
// </Route>

// replace these with imports of the actual components/pages when they're ready

const Notifications = () => (
  <div>Notifications</div>
);
const Messages = () => (
  <div>Messages</div>
);

function NavBar({
  currentUser, likeProfile, humanPhoto, breeds, dogsImg, currentDogs, getRandomUser, matches, matchesPhotos, likePhoto, allMessages, currentUserID, potiential, potientialDog, showNotifs, setShowNotifs, matchesInfo,
}) {
  const [notifs, setNotifs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [human, setHuman] = useState(false);
  const [dogs, setDogs] = useState(false);

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
        setNotifs(data.data);
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
    if (showNotifs) getNotifs();
  }, [showNotifs]);

  return (
    <BrowserRouter>
      <nav className="navigation-bar">
        <NavLink className="nav-icon" exact to="/home" onClick={() => { setEdit(false); setShowNotifs(false); }}><i className="fas fa-home" /></NavLink>
        <NavLink className="nav-icon" exact to="/notifications" onClick={() => { setShowNotifs(!showNotifs); setEdit(false); }}><i className="far fa-bell" /></NavLink>
        <NavLink className="nav-icon" exact to="/inbox" onClick={() => setEdit(false)}><i className="far fa-envelope" /></NavLink>
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
        {/* <Route exact path="/notifications" component={Notifications} /> */}
        {' '}
        {/* delete this route if notifications is just modal not a page */}
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
