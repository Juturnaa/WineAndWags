import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

// https://reactrouter.com/web/api/Redirect may need to use <Redirect> once logins are setup
// example:
// <Route exact path="/">
//  {loggedIn ? <Redirect to="/home" /> : <LandingPage />}
// </Route>

// replace these with imports of the actual components/pages when they're ready
const Homepage = () => (
  <div>Home Page</div>
)
const Notifications = () => (
  <div>Notifications</div>
)
const Messages = () => (
  <div>Messages</div>
)
const Map = () => (
  <div>Map</div>
)
const EditProfile = () => (
  <div>Edit Profile</div>
)

export default function NavBar() {
  return (
    <BrowserRouter>
      {/* part that needs to be styled */}
      <nav>
        <NavLink exact to='/home'>Home</NavLink>
        <NavLink exact to='/notifications' >Notifications</NavLink>
        <NavLink exact to='/messages' >Messages</NavLink>
        <NavLink exact to='/map' >Map</NavLink>
        <NavLink exact to='/editprofile' >Edit Profile</NavLink>
      </nav>

      {/* Routes */}
      <Switch>
        <Route exact path="/notifications" component={Notifications} /> {/* delete this route if notifications is just modal not a page */}
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route path="/*" component={Homepage} />
      </Switch>
    </BrowserRouter>

  )
}

