/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Homepage from './Homepage/Homepage';
import EditProfile from './Homepage/EditProfile';
import Inbox from './Messages/Inbox';

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
const Map = () => (
  <div>Map</div>
);

<<<<<<< HEAD
function NavBar({
  currentUser, humanPhoto, breeds, dogsImg, currentDogs, getRandomUser, matches, matchesPhotos,
}) {
=======
function NavBar({ currentUser, likeProfile, humanPhoto, breeds, dogsImg, currentDogs, getRandomUser }) {
>>>>>>> e54886c4ff393262bafa368a214859ce65f0639b
  return (
    <BrowserRouter>
      <nav>
<<<<<<< HEAD
        <NavLink exact to="/home">Home</NavLink>
        <NavLink exact to="/notifications">Notifications</NavLink>
        <NavLink exact to="/inbox">Messages</NavLink>
        <NavLink exact to="/map">Map</NavLink>
        <NavLink exact to="/editprofile">Edit Profile</NavLink>
=======
        <NavLink className='nav-icon' exact to="/home"><i className="fas fa-home"></i></NavLink>
        <NavLink className='nav-icon' exact to="/notifications"><i className="far fa-bell"></i></NavLink>
        <NavLink className='nav-icon' exact to="/messages"><i className="far fa-envelope"></i></NavLink>
        <NavLink className='nav-icon' exact to="/map"><i className="far fa-map"></i></NavLink>
        <NavLink className='nav-icon' exact to="/editprofile">
          {humanPhoto.length ? <div className='profile-thumbnail'
            style={{ backgroundImage: `url(${humanPhoto[0].url})` }}></div>
            : <div className='profile-thumbnail'></div>}
        </NavLink>
>>>>>>> e54886c4ff393262bafa368a214859ce65f0639b
      </nav>

      {/* Routes */}
      <Switch>
        <Route exact path="/notifications" component={Notifications} />
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
            />
          )}
        />
        <Route exact path="/map" component={Map} />
        <Route exact path="/editprofile" render={() => <EditProfile currentUser={currentUser} humanPhoto={humanPhoto} dogsImg={dogsImg} breeds={breeds} />} />
        <Route path="/*" render={() => <Homepage likeProfile={likeProfile} getRandomUser={getRandomUser} currentUser={currentUser} humanPhoto={humanPhoto} dogPhotos={dogsImg} currentDogs={currentDogs} />} />
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
