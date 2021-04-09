/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Homepage from './Homepage/Homepage';
import EditProfile from './Homepage/EditProfile';
import Inbox from './Messages/Inbox';
import Map from './Map/Map';
import axios from 'axios';

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
  currentUser, likeProfile, humanPhoto, breeds, dogsImg, currentDogs, getRandomUser, matches, matchesPhotos, likePhoto, allMessages, currentUserID, potiential, potientialDog, editProfileBtn, setBtn, showNotifs, setShowNotifs, matchesInfo,
}) {
  let [notifs, setNotifs] = useState([]);
  let getNotifs = () => {
    axios.get(`/app/notifications/${currentUserID}`)
    .then(data=> {
      setNotifs(data.data)
    })
  }
  let updateNotif = (notif_id) =>{
    axios.patch(`/app/notifications/${notif_id}`)
    .then(() => {
      getNotifs();
      console.log("updated")
    })
  }
  useEffect(()=>{
    if(showNotifs) getNotifs()
  },[showNotifs])
  return (
    <BrowserRouter>
      <div className="navbar-title-content">
        <div className="navbar-title">
          <h2>Wine and Wags</h2>
          <h2>Wine and Wags</h2>
        </div>
      </div>
        <nav className='navigation-bar'>
          <NavLink className="nav-icon" exact to="/home" onClick={() => setBtn(true)}><i className="fas fa-home" /></NavLink>
          <NavLink className="nav-icon" exact to="/notifications" onClick={() => { setShowNotifs(!showNotifs); setBtn(true) }}><i className="far fa-bell" /></NavLink>
          <NavLink className="nav-icon" exact to="/inbox" onClick={() => setBtn(true)}><i className="far fa-envelope" /></NavLink>
          <NavLink className="nav-icon" exact to="/map" onClick={() => setBtn(true)} style={{marginRight: '2.5rem'}}><i className="far fa-map" /></NavLink>
          <NavLink className="nav-icon" exact to="/editprofile" onClick={() => setBtn(true)}>
          {humanPhoto.length ? (
            <div
              className="profile-thumbnail"
              style={{ backgroundImage: `url(${humanPhoto[0].url})` }}
            />
          )
            : <div className="profile-thumbnail" />}
        </NavLink>
      </nav>
      {showNotifs ?
        <div className="notifs">
          <div className="notifs-triangle"></div>
          <div className="notifs-title">Notifications</div>
          <div className="notifs-content">
            {notifs.map((notif, i)=> {
              let txt;
              if(notif.type==="photoLike") txt =" liked your photo";
              else if(notif.type==="message") txt = " sent you a message";
              if(notif.read) return <div className="read-notif">{notif.sender_name}{txt}</div>
              else return <div className="unread-notif" onClick={()=>updateNotif(notif.id)}>{notif.sender_name}{txt}</div>
            })}

          </div>
        </div>
          : ""}
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
          <Route exact path="/editprofile" render={() => <EditProfile currentUser={currentUser} humanPhoto={humanPhoto} dogsImg={dogsImg} breeds={breeds} editProfileBtn={editProfileBtn} setBtn={setBtn} />} />
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
  setBtn: PropTypes.func,
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
  setBtn: null,
};

export default NavBar;
