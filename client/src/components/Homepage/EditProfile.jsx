/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// need to set up a function to check the inputs for ZIPCODE, AGE, EMAIL FOLLOWS THE RIGHT FORMAT.
// implement react paginton for edit of dogs
// hard coded to display only ONE DOG ONLY, need to adjust
// add placeholder texts for the current value of the place
// need to add photos
// need to make sure ratings, age is nubers for dogs information

function EditProfile({ currentUser, currentPhoto, breeds }) {
  const [human, setHuman] = useState(false);
  const [dogs, setDogs] = useState(false);
  const [humanValue, setHumanValue] = useState({
    name: '', gender: '', bio: '', email: '', password: '', age: '', zipcode: '', searched_as: '',
  });
  const [dogValue, setDogValue] = useState({
    name: '',
    gender: '',
    bio: '',
    rating: '',
    owner_id: '',
    age: '',
    size: '',
    breed: '',
  });
  const [hypoallergenic, setHypo] = useState();
  const [neutered, setNeutered] = useState();
  const [healthy, setHealthy] = useState();
  const [dogsInfo, setDogsinfo] = useState();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setHypo(currentUser.dogs_info[0].hypo);
      setNeutered(currentUser.dogs_info[0].neutered);
      setHealthy(currentUser.dogs_info[0].healthy);
      setDogsinfo(currentUser.dogs_info);
    }
  }, [currentUser]);

  console.log(dogsInfo);

  const arrangeDogs = () => {

  }

  const changeHuman = () => {
    setHuman(true);
    setDogs(false);
  };

  const changeDogs = () => {
    setHuman(false);
    setDogs(true);
  };

  const submitHuman = (e) => {
    e.preventDefault();
    const values = Object.values(humanValue);
    const keys = Object.keys(humanValue);
    const newValues = {};
    for (let i = 0; i < values.length; i++) {
      if (values[i].length === 0) {
        newValues[keys[i]] = currentUser[keys[i]];
      } else if (keys[i] === 'age') {
        newValues[keys[i]] = Number(values[i]);
      } else {
        newValues[keys[i]] = values[i];
      }
    }
    // hardcoded the end point
    axios.patch('/app/users/my-profile/sophiaacheong5@gmail.com', newValues)
      .then((results) => alert(results.data))
      .catch((err) => console.error(err));
  };

  const submitDog = (e) => {
    e.preventDefault();
    const values = Object.values(dogValue);
    const keys = Object.keys(dogValue);
    const newValues = {};
    for (let i = 0; i < values.length; i++) {
      if (values[i].length === 0) {
        newValues[keys[i]] = dogsInfo[0][keys[i]];
      } else if (keys[i] === 'age') {
        newValues[keys[i]] = Number(values[i]);
      } else {
        newValues[keys[i]] = values[i];
      }
    }
    newValues.hypo = hypoallergenic;
    newValues.neutered = neutered;
    newValues.healthy = healthy;
    newValues.owner_id = currentUser.id;
    // hardcoded the end point
    axios.patch('/app/users/my-dog/43', newValues)
      .then((results) => alert(results.data))
      .catch((err) => console.error(err));
  };

  const humanValueChange = (e) => {
    setHumanValue({ ...humanValue, [e.target.name]: e.target.value });
  };

  const dogValueChange = (e) => {
    setDogValue({ ...dogValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button type="button" onClick={changeHuman}>EDIT MYSELF</button>
      <button type="button" onClick={changeDogs}>EDIT MY DOG(S)</button>
      {human
        ? (
          <form id="editHuman" onSubmit={submitHuman}>
            <div>
              Name:
              {' '}
              <br />
              <input type="text" name="name" onChange={humanValueChange} />
            </div>
            <div>
              Gender:
              {' '}
              <br />
              Male
              {' '}
              <input type="radio" name="gender" value="m" onChange={humanValueChange} />
              Female
              {' '}
              <input type="radio" name="gender" value="f" onChange={humanValueChange} />
              Non-Binary
              {' '}
              <input type="radio" name="gender" value="nb" onChange={humanValueChange} />
            </div>
            <div>
              Bio:
              {' '}
              <br />
              <textarea rows="4" cols="50" name="bio" onChange={humanValueChange} />
            </div>
            <div>
              E-mail:
              {' '}
              <br />
              <input type="text" name="email" onChange={humanValueChange} />
            </div>
            <div>
              Password:
              {' '}
              <br />
              <input type="text" name="password" onChange={humanValueChange} />
            </div>
            <div>
              Age:
              {' '}
              <br />
              <input type="text" name="age" onChange={humanValueChange} />
            </div>
            <div>
              Zipcode:
              {' '}
              <br />
              <input type="text" name="zipcode" onChange={humanValueChange} />
            </div>
            <div>
              Search as:
              {' '}
              <br />
              Male
              {' '}
              <input type="radio" name="searched_as" value="m" onChange={humanValueChange} />
              Female
              {' '}
              <input type="radio" name="searched_as" value="f" onChange={humanValueChange} />
              Non-Binary
              {' '}
              <input type="radio" name="searched_as" value="nb" onChange={humanValueChange} />
            </div>
            <button type="submit">Save changes</button>
          </form>
        )
        : null}
      {dogs ? (
        <form id="editDog" onSubmit={submitDog}>
          <div>
            Name:
            {' '}
            <br />
            <input type="text" name="name" onChange={dogValueChange} />
          </div>
          <div>
            Gender:
            {' '}
            <br />
            Male
            {' '}
            <input type="radio" name="gender" value="M" onChange={dogValueChange} />
            Female
            {' '}
            <input type="radio" name="gender" value="F" onChange={dogValueChange} />
          </div>
          <div>
            Bio
            {' '}
            <br />
            <textarea name="bio" rows="4" cols="50" onChange={dogValueChange} />
          </div>
          <div>
            Hypo
            {' '}
            <input type="checkbox" name="hypo" checked={hypoallergenic} onChange={() => setHypo(!hypoallergenic)} />
          </div>
          <div>
            Neutered/Spayed
            {' '}
            <input type="checkbox" name="neutered" checked={neutered} onChange={() => setNeutered(!neutered)} />
          </div>
          <div>
            Age
            {' '}
            <br />
            <input type="text" name="age" onChange={dogValueChange} />
          </div>
          <div>
            Size ...input examples under the inputs
            {' '}
            <br />
            XS
            {' '}
            <input type="radio" name="size" value="XS" onChange={dogValueChange} />
            S
            {' '}
            <input type="radio" name="size" value="S" onChange={dogValueChange} />
            M
            {' '}
            <input type="radio" name="size" value="M" onChange={dogValueChange} />
            L
            {' '}
            <input type="radio" name="size" value="L" onChange={dogValueChange} />
            XL
            {' '}
            <input type="radio" name="size" value="XL" onChange={dogValueChange} />
          </div>
          <div>
            Breeds
            {' '}
            <br />
            <select name="breed" onChange={dogValueChange}>
              {breeds.map((item, index) => (
                <option key={index} value={item} name="breed">{item}</option>
              ))}
            </select>
          </div>
          <div>
            Healthy
            {' '}
            <input type="checkbox" name="healthy" checked={healthy} onChange={() => setHealthy(!healthy)} />
          </div>
          <button type="submit">Save changes</button>
        </form>
      ) : null}
    </div>
  );
}

EditProfile.propTypes = {
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
  breeds: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

EditProfile.defaultProps = {
  currentUser: {},
  currentPhoto: [],
  breeds: [],
};

export default EditProfile;
