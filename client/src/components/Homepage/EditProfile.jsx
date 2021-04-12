/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { IconButton, Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditHumanImage from './EditHumanImage';
import EditDogImage from './EditDogImage';
import AddDogModal from './AddDogModal';

// have to click humans to show dogs..
// for the wrong entries, instead of alerting the UI switch to doing error boxes (react)

const useStyles = makeStyles({
  upload: {
    display: 'flex',
    width: '50%',
    border: 0,
    fontSize: '1.1rem',
  },
  trash: {
    fontSize: '2.5rem',
  },
  uploadBtn: {
    fontSize: '1.1rem',
  },
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  addDogBtn: {
    backgroundColor: 'rgba(239, 249, 240, 0.75)',
  },
});

function EditProfile({
  currentUser, dogsImg, breeds, humanPhoto, human, dogs, currentUserID, setHumanPhoto, setDogsPhoto,
}) {
  const classes = useStyles();
  const [humanValue, setHumanValue] = useState({
    name: '', gender: '', bio: '', email: '', password: '', age: '', zipcode: '', searched_as: '',
  });
  const [dogValue, setDogValue] = useState({
    name: '',
    bio: '',
    rating: '',
    owner_id: '',
    age: '',
    size: '',
    breed: '',
    city: '',
    searched_as: '',
  });
  const [hypoallergenic, setHypo] = useState();
  const [neutered, setNeutered] = useState();
  const [healthy, setHealthy] = useState();
  const [dogsInfo, setDogsinfo] = useState();
  const [currentDogPg, setDogPage] = useState(1);
  const [dogPages, setPages] = useState();
  const [breedFilterOptions, setBreedFilter] = useState();
  const [humanImg, setHumanImg] = useState([]);
  const [uploadHuman, setUploadHuman] = useState('');
  const [dogImages, setDogImages] = useState();
  const [addDog, setAddDog] = useState(false);
  const [humanURL, setHumanURL] = useState(0);
  const [dogURL, setDogURL] = useState(0);
  const [uploadDog, setUploadDog] = useState();
  const [dogID, setDogID] = useState();
  const [dogIndex, setDogIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (dogsImg.length > 0) {
      setDogImages(Object.assign({}, ...dogsImg));
    }
  }, [dogsImg]);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setHypo(currentUser.dogs_info[0].hypo);
      setNeutered(currentUser.dogs_info[0].neutered);
      setHealthy(currentUser.dogs_info[0].healthy);
      setDogsinfo(currentUser.dogs_info);
    }
  }, [currentUser]);

  useEffect(() => {
    const humansimages = [];
    if (humanPhoto.length > 0) {
      humanPhoto.map((item) => {
        const url = {};
        url.url = item.url;
        return humansimages.push(url);
      });
    }
    setHumanImg(humansimages);
  }, [humanPhoto]);

  const getPhotos = () => {
    axios.get(`/app/users/photos/${currentUserID}`)
      .then((results) => {
        const humanphotos = [];
        const dogsphotos = [];
        for (let i = 0; i < results.data.length; i++) {
          console.log(results.data[i])
          if (results.data[i].dog_id === null) {
            humanphotos.push(results.data[i]);
          } else {
            dogsphotos.push(results.data[i]);
          }

          console.log('dogs photos', dogsphotos)
          setHumanPhoto(humanphotos);
          setDogsPhoto(dogsphotos);
        }
      })
      .catch((err) => console.error(err));
  };

  const arrangeDogs = (arr) => {
    const chunk = [];
    for (let i = 0; i < arr.length; i += 1) {
      const myChunk = arr.slice(i, i + 1);
      chunk.push(myChunk);
    }
    setPages(chunk);
    setDogID(chunk[0][0].id);
  };

  useEffect(() => {
    if (dogsInfo !== undefined) {
      arrangeDogs(dogsInfo);
    }
  }, [dogsInfo]);

  const changePages = (e, value) => {
    setDogPage(value);
    setDogID(dogPages[value - 1][0].id);
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

  const deletePhoto = () => {
    axios.delete(`/app/users/delete/${humanURL}`)
      .then((results) => alert('deleted'))
      .then(() => getPhotos())
      .then(() => setIndex(0))
      .catch((err) => console.error(err));
  };

  const deleteDogPhoto = () => {
    axios.delete(`/app/users/delete/${dogURL}`)
      .then((results) => alert('deleted'))
      .then(() => getPhotos())
      .then(() => setDogIndex(0))
      .catch((err) => console.error(err));
  };

  const submitHuman = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    };
    setValidated(true);
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
      // axios.patch(`/app/users/my-profile/${currentUserID}`, newValues)
      //   .then((results) => alert(results.data))
      //   .catch((err) => console.error(err));
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
      axios.patch(`/app/users/my-dog/${dogID}`, newValues)
        .then((results) => alert(results.data))
        .catch((err) => console.error(err));
    }
  };

  const humanValueChange = (e) => {
    setHumanValue({ ...humanValue, [e.target.name]: e.target.value });
  };

  const uploadClick = () => {
    const fd = new FormData();
    fd.append('image', uploadHuman, uploadHuman.name);
    axios.post(`/app/users/photos/${currentUser.id}`, fd)
      .then((results) => alert(results.data))
      .then(() => getPhotos())
      .catch((err) => alert('INVALID FILE TYPE. JPG/JPEG/PNG ONLY'));
  };

  const uploadDogClick = () => {
    const fd = new FormData();
    fd.append('owner_id', currentUser.id);
    fd.append('image', uploadDog, uploadDog.name);
    axios.post(`/app/users/my-dog/${dogID}`, fd)
      .then((results) => alert(results.data))
      .then(() => getPhotos())
      .catch((err) => alert('INVALID FILE TYPE. JPG/JPEG/PNG ONLY'));
  };

  return (
    <div id="editprofile-body">
      {human
        ? (
          <Form noValidate validated={validated} id="editHuman" onSubmit={submitHuman}>
            <div id="editProfile-container">
              <div className="humanEdit">
                <EditHumanImage humanImg={humanImg} humanPhoto={humanPhoto} setHumanURL={setHumanURL} index={index} setIndex={setIndex} />
                <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                  <Input className={classes.upload} type="file" name="url" id="fileinput" onChange={(e) => setUploadHuman(e.target.files[0])} />
                  <div className="trashbutton">
                    <IconButton onClick={deletePhoto}>
                      <DeleteForeverRoundedIcon className={classes.trash} variant="rounded" />
                    </IconButton>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button className={classes.uploadBtn} type="button" variant="outlined" onClick={uploadClick}>
                    <CloudUploadIcon />
                    {' '}
                    &nbsp;
                    Upload Photo
                  </Button>
                </div>
              </div>
              <div className="humanEdit2">
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label className="text-center">Name</Form.Label>
                    <Form.Control as="input" name="name" placeholder={currentUser.name} onChange={humanValueChange} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="text-center">Age</Form.Label>
                    <Form.Control as="input" name="age" placeholder={currentUser.age} onChange={humanValueChange} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="text-center">Gender</Form.Label>
                    <Form.Check type="radio" label="Male" name="searched_as" value="M" onChange={humanValueChange} />
                    <Form.Check type="radio" label="Female" name="searched_as" value="F" onChange={humanValueChange} />
                    <Form.Check type="radio" label="Non-Binary" name="searched_as" value="All" onChange={humanValueChange} />
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control as="textarea" rows={4} col={50} name="bio" placeholder={currentUser.bio} onChange={humanValueChange} />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control as="input" name="email" placeholder={currentUser.email} onChange={humanValueChange} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control as="input" name="password" onChange={humanValueChange} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control as="input" name="city" placeholder={currentUser.city} onChange={humanValueChange} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control as="input" name="zipcode" placeholder={currentUser.zipcode} onChange={humanValueChange} />
                  </Form.Group>
                </Form.Row>
                <Button className={classes.uploadBtn} type="submit">Save changes</Button>
              </div>
            </div>
          </Form>
        )
        : null}
      {dogs ? (
        <div id="editDogPage">
          <div style={{ display: 'inline-flex', justifyContent: 'center', marginTop: '0.2%' }}>
            <Button className={classes.addDogBtn} variant="contained" type="button" onClick={() => setAddDog(!addDog)}>Add a Dog</Button>
          </div>
          {addDog ? <AddDogModal addDog={addDog} setAddDog={setAddDog} currentUserID={currentUserID} /> : null}
          {dogPages !== undefined ? dogPages[currentDogPg - 1].map((item, index) => (
            <div id="editDog-container">
              <Form id="editDog-form" onSubmit={submitDog} key={index}>
                <div className="dogForm-inputs">
                  <EditDogImage dogImages={dogImages} id={item.id} setDogURL={setDogURL} setDogID={setDogID} dogIndex={dogIndex} setDogIndex={setDogIndex} />
                  <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                    <Input className={classes.upload} type="file" name="url" id="fileinput" onChange={(e) => setUploadDog(e.target.files[0])} />
                    <div className="trashbutton">
                      <IconButton onClick={deleteDogPhoto}>
                        <DeleteForeverRoundedIcon className={classes.trash} variant="rounded" />
                      </IconButton>
                    </div>
                  </div>
                  <Button type="button" onClick={uploadDogClick}>Upload Photo</Button>
                </div>
                <div className="dogForm-inputs2">
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control as="input" name="name" placeholder={item.name} onChange={dogValueChange} />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Gender</Form.Label>
                      <Form.Check type="radio" name="gender" label="Male" value="M" onChange={dogValueChange} />
                      <Form.Check type="radio" name="gender" label="Female" value="F" onChange={dogValueChange} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" name="bio" rows={5} cols={50} placeholder={item.bio} onChange={dogValueChange} />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Hypoallergenic</Form.Label>
                      <Form.Check type="checkbox" name="hypo" checked={hypoallergenic} onChange={() => setHypo(!hypoallergenic)} />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Neutered/Spayed</Form.Label>
                      <Form.Check type="checkbox" name="neutered" checked={neutered} onChange={() => setNeutered(!neutered)} />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Health Issues</Form.Label>
                      <Form.Check type="checkbox" name="healthy" checked={healthy} onChange={() => setHealthy(!healthy)} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Age</Form.Label>
                      <Form.Control as="input" name="age" placeholder={item.age} onChange={dogValueChange} />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Breed</Form.Label>
                      <Form.Control list="dogBreeds" type="input" name="breed" onChange={filterChange} />
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
                    </Form.Group>
                  </Form.Row>
                  <Form.Group>
                    <Form.Label>Size</Form.Label>
                    <Form.Check type="radio" name="size" label="XS" value="XS" onChange={dogValueChange} />
                    <Form.Check type="radio" name="size" label="S" value="S" onChange={dogValueChange} />
                    <Form.Check type="radio" name="size" label="M" value="M" onChange={dogValueChange} />
                    <Form.Check type="radio" name="size" label="L" value="L" onChange={dogValueChange} />
                    <Form.Check type="radio" name="size" label="XL" value="XL" onChange={dogValueChange} />
                  </Form.Group>
                  <Button className={classes.uploadBtn} type="submit">Save changes</Button>
                </div>
              </Form>
            </div>
          )) : null }
          <Pagination color="primary" className={classes.page} size="large" count={dogPages.length} variant="outlined" page={currentDogPg} onChange={changePages} />
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
  dogsImg: PropTypes.arrayOf(
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
};

EditProfile.defaultProps = {
  currentUser: {},
  dogsImg: [],
  breeds: [],
  humanPhoto: [],
};

export default EditProfile;
