import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Map from './Map';
import ProfileView from './Homepage/ProfileVIew';
import axios from 'axios';
const App = () => {

  const [currentUser, setCurrentUser] = useState('')
  const getUser = () => {
    axios.get('/app/users/my-profile/sophiaacheong4@gmail.com')
      .then((data) => {
        setCurrentUser(data.data[0])
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <NavBar />
      <ProfileView user={currentUser} />
      {/* <Map /> */}
    </div>
  )
}

export default App;
