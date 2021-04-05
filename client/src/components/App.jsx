import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import breedData from '../dummyData/dogBreed';
import Map from './Map';
import ProfileView from './Homepage/ProfileView';
import axios from 'axios';

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [breeds, setBreeds] = useState(breedData);
  const [currentPhoto, setPhoto] = useState();


  useEffect(() => {
    axios.all([
      axios.get('/app/users/my-profile/sophiaacheong5@gmail.com'),
      axios.get('/app/users/photos/7'),
    ])
      .then(axios.spread((one, two) => {
        setCurrentUser(one.data);
        setPhoto(two.data);
      }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <NavBar currentUser={currentUser} currentPhoto={currentPhoto} breeds={breeds} />
      {/* ProfileView needs to be moved under HOME PAGE component */}
      {/* <ProfileView user={currentUser} /> */}
      {/* <Map /> */}
    </div>
  );
};

export default App;
