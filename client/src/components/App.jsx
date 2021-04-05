/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import breedData from '../dummyData/dogBreed';
import Map from './Map';
import ProfileView from './Homepage/ProfileView';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentDogs, setCurrentDogs] = useState([]);
  const [breeds, setBreeds] = useState(breedData);
  const [humanPhoto, setHumanPhoto] = useState([]);
  const [dogsPhoto, setDogsPhoto] = useState([]);
  const [dogsImg, setDogsImg] = useState([]);

  useEffect(() => {
    const dogsimages = [];
    const dogsKey = {};
    if (dogsPhoto.length > 0) {
      for (let i = 0; i < dogsPhoto.length; i++) {
        if (dogsPhoto[i].dog_id in dogsKey) {
          dogsKey[dogsPhoto[i].dog_id].push(dogsPhoto[i]);
        } else {
          dogsKey[dogsPhoto[i].dog_id] = [dogsPhoto[i]];
        }
      }
      dogsimages.push(dogsKey);
    }
    setDogsImg(dogsimages);
  }, [dogsPhoto]);

  const getRandomUser = () => {
    let random;
    axios.get('/app/users/random-profile')
      .then((data) => {
        random = Math.floor(Math.random() * (data.data.length - 0) + 0);
        setCurrentUser(data.data[random])
        setCurrentDogs(data.data[random].dogs_info);
      })
      .then(() => {
        axios.get(`/app/users/photos/${random + 1}`)
          .then((data) => {
            setHumanPhoto(data.data);
          });
      });
  };

  useEffect(() => {
    axios.all([
      axios.get('/app/users/my-profile/sophiaacheong5@gmail.com'),
      axios.get('/app/users/photos/7'),
    ])
      .then(axios.spread((one, two) => {
        setCurrentUser(one.data);
        setCurrentDogs(one.data.dogs_info);
        const human = [];
        const dogs = [];
        for (let i = 0; i < two.data.length; i++) {
          if (two.data[i].dog_id === null) {
            human.push(two.data[i]);
          } else {
            dogs.push(two.data[i]);
          }
        }
        setHumanPhoto(human);
        setDogsPhoto(dogs);
      }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <NavBar humanPhoto={humanPhoto} dogsImg={dogsImg} getRandomUser={getRandomUser} currentUser={currentUser} breeds={breeds} currentDogs={currentDogs} />
      {/* <Map /> */}
    </div>
  );
};

export default App;
