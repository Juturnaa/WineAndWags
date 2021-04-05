/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';

// implement react paginton for edit of dogs
// need to add photos
// switch raw auto complete code to react library
// need to consider MUTT dogs
// for the wrong entries, instead of alerting the UI switch to doing error boxes (react)

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
  const [currentDogPg, setDogPage] = useState(1);
  const [dogPages, setPages] = useState();
  const [breedFilterOptions, setBreedFilter] = useState();

  console.log(currentPhoto)

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setHypo(currentUser.dogs_info[0].hypo);
      setNeutered(currentUser.dogs_info[0].neutered);
      setHealthy(currentUser.dogs_info[0].healthy);
      setDogsinfo(currentUser.dogs_info);
    }
  }, [currentUser]);

  const arrangeDogs = (arr) => {
    const chunk = [];
    for (let i = 0; i < arr.length; i += 2) {
      const myChunk = arr.slice(i, i + 2);
      chunk.push(myChunk);
    }
    setPages(chunk);
  };

  useEffect(() => {
    if (dogsInfo !== undefined) {
      arrangeDogs(dogsInfo);
    }
  }, [dogsInfo]);

  const changePages = (e, value) => {
    setDogPage(value);
  };

  const changeHuman = () => {
    setHuman(true);
    setDogs(false);
  };

  const changeDogs = () => {
    setHuman(false);
    setDogs(true);
  };

  const dogValueChange = (e) => {
    setDogValue({ ...dogValue, [e.target.name]: e.target.value });
  };

  const filterChange = (e) => {
    const userInput = e.target.value;

    const filterOptions = breeds.filter(
      (breed) => breed.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );
    setBreedFilter(filterOptions);
    dogValueChange(e);
  };

  const emailValidation = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return true;
    }
    return false;
  };

  const numberValidation = (num) => {
    if (isNaN(num)) {
      return false;
    }
    return true;
  };

  const submitHuman = (e) => {
    e.preventDefault();
    let result;
    let resultAge;
    let resultZip;
    if (humanValue.email.length > 0) {
      result = emailValidation(humanValue.email);
    } else {
      result = true;
    }
    if (humanValue.age.length > 0) {
      resultAge = numberValidation(humanValue.age);
    } else {
      resultAge = true;
    }
    if (humanValue.zipcode.length > 0) {
      resultZip = numberValidation(humanValue.zipcode);
    } else {
      resultZip = true;
    }

    if (result && resultAge && resultZip) {
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
    } else if (!result && !resultAge && !resultZip) {
      alert('Email, Age, Zipcode are not valid');
    } else if (!result) {
      alert('Email is not valid');
    } else if (!resultAge) {
      alert('Age is not valid');
    } else {
      alert('Zipcode is not valid');
    }
  };

  const submitDog = (e) => {
    e.preventDefault();
    if (isNaN(dogValue.age)) {
      alert('Age is not valid');
    } else {
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
    }
  };

  const humanValueChange = (e) => {
    setHumanValue({ ...humanValue, [e.target.name]: e.target.value });
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
              <input type="text" name="name" placeholder={currentUser.name} onChange={humanValueChange} />
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
              <textarea rows="4" cols="50" name="bio" placeholder={currentUser.bio} onChange={humanValueChange} />
            </div>
            <div>
              E-mail:
              {' '}
              <br />
              <input type="text" name="email" placeholder={currentUser.email} onChange={humanValueChange} />
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
              <input type="text" name="age" placeholder={currentUser.age} onChange={humanValueChange} />
            </div>
            <div>
              Zipcode:
              {' '}
              <br />
              <input type="text" name="zipcode" placeholder={currentUser.zipcode} onChange={humanValueChange} />
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
        <div id="editDogPage">
          {dogPages[currentDogPg - 1].map((item, index) => (
            <form id="editDog" onSubmit={submitDog} key={index}>
              <div>
                Name:
                {' '}
                <br />
                <input type="text" name="name" placeholder={item.name} onChange={dogValueChange} />
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
                <textarea name="bio" rows="4" cols="50" placeholder={item.bio} onChange={dogValueChange} />
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
                <input type="text" name="age" placeholder={item.age} onChange={dogValueChange} />
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
                <input list="dogBreeds" type="text" name="breed" onChange={filterChange} />
                {breedFilterOptions !== undefined && breedFilterOptions.length > 0
                  ? (
                    <datalist id="dogBreeds">
                      {breedFilterOptions.map((breedItem, ind) => (
                        <option key={ind} value={breedItem}>{breedItem}</option>
                      ))}
                    </datalist>
                  )
                  : null }
                {breedFilterOptions !== undefined && breedFilterOptions.length === 0 && dogValue.breed.length > 0
                  ? <div> No options found! </div>
                  : null}
                {/* <select name="breed" onChange={dogValueChange}>
                  {breeds.map((itemBreed, index) => (
                    <option key={index} value={itemBreed} name="breed">{itemBreed}</option>
                  ))}
                </select> */}
              </div>
              <div>
                Healthy
                {' '}
                <input type="checkbox" name="healthy" checked={healthy} onChange={() => setHealthy(!healthy)} />
              </div>
              <button type="submit">Save changes</button>
            </form>
          ))}
          <Pagination count={dogPages.length} variant="outlined" page={currentDogPg} onChange={changePages} />
        </div>
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
