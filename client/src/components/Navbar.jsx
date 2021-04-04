/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Homepage from './Homepage/Homepage';
import EditProfile from './Homepage/EditProfile';

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

function NavBar({ currentUser, currentPhoto }) {
  return (
    <BrowserRouter>
      {/* part that needs to be styled */}
      <nav>
        <NavLink exact to="/home">Home</NavLink>
        <NavLink exact to="/notifications">Notifications</NavLink>
        <NavLink exact to="/messages">Messages</NavLink>
        <NavLink exact to="/map">Map</NavLink>
        <NavLink exact to="/editprofile">Edit Profile</NavLink>
      </nav>

      {/* Routes */}
      <Switch>
        <Route exact path="/notifications" component={Notifications} />
        {' '}
        {/* delete this route if notifications is just modal not a page */}
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/editprofile" render={() => <EditProfile currentUser={currentUser} currentPhoto={currentPhoto} />} />
        <Route path="/*" component={Homepage} />
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
  currentPhoto: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

NavBar.defaultProps = {
  currentUser: {},
  currentPhoto: [],
};

export default NavBar;
