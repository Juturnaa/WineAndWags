import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import breedData from '../dummyData/dogBreed';
import Map from './Map';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentDogs, setCurrentDogs] = useState([]);
  const [breeds, setBreeds] = useState(breedData);
  const [currentPhoto, setPhoto] = useState();

  const getRandomUser = () => {
    axios.get('/app/users/random-profile')
      .then((data) => {
        let random = Math.floor(Math.random() * (data.data.length - 0) + 0);
        console.log(random)
      })
  }

  useEffect(() => {
    axios.all([
      axios.get('/app/users/my-profile/sophiaacheong5@gmail.com'),
      axios.get('/app/users/photos/7'),
    ])
      .then(axios.spread((one, two) => {
        setCurrentUser(one.data);
        setCurrentDogs(one.data.dogs_info);
        setPhoto(two.data);
      }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <NavBar getRandomUser={getRandomUser} currentUser={currentUser} currentPhoto={currentPhoto} breeds={breeds} currentDogs={currentDogs}/>
      {/* <Map /> */}
    </div>
  );
};

export default App;
