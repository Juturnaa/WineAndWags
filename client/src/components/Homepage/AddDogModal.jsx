/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import breed from '../../dummyData/dogBreed';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const useStyles = makeStyles({
  submitButton: {
    fontSize: 'medium',
  },
});

function AddDogModal({
  setAddDog, addDog, currentUserID, setCurrentUser, setCurrentDogs, setHumanPhoto, setDogsPhoto,
}) {
  const classes = useStyles();
  const [dogImgUpload, setDogImgUpload] = useState();
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
  const [hypoallergenic, setHypo] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [health, setHealth] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState(false);

  const valueChange = (e) => {
    setDogValue({ ...dogValue, [e.target.name]: e.target.value });
  };

  const updateDogs = () => {
    axios.all([
      axios.get(`/app/users/my-profile/${currentUserID}`),
      axios.get(`/app/users/photos/${currentUserID}`),
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
  };

  const postDog = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (dogImgUpload === undefined) {
      setAlert(true);
    } else {
      setAlert(false);
      const fd = new FormData();
      fd.append('image', dogImgUpload, dogImgUpload.name);
      fd.append('owner_id', currentUserID);
      const information = dogValue;
      information.hypo = hypoallergenic;
      information.neutered = neutered;
      information.healthy = health;
      axios.post(`/app/dogs/${currentUserID}`, information)
        .then((results) => axios.post(`/app/users/my-dog/${results.data.id}`, fd)
          .then((results) => alert(results.data))
          .then(() => updateDogs())
          .catch((err) => setAlert(false)))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Modal style={customStyles} appElement={document.getElementById('app')} isOpen={addDog} onRequestClose={() => setAddDog(!addDog)}>
        {alert ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please upload an image file -
            {' '}
            <strong>JPG/JPEG/PNG ONLY</strong>
          </Alert>
        ) : null}
        <div id="modalAddDog">
          <Form noValidate validated={validated} onSubmit={postDog}>
            <div>
              Photo
              {' '}
              <Input type="file" name="url" id="fileinput" onChange={(e) => setDogImgUpload(e.target.files[0])} />
            </div>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control as="input" type="text" name="name" onChange={valueChange} required />
                <FormControl.Feedback type="invalid">Please provide a valid name.</FormControl.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control as="input" name="age" type="number" min="0" max="30" onChange={valueChange} required />
                <FormControl.Feedback type="invalid">Please provide a valid age.</FormControl.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} col={20} name="bio" onChange={valueChange} required />
              <FormControl.Feedback type="invalid">Please provide a valid bio.</FormControl.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Breed</Form.Label>
              <Form.Control as="select" name="breed" onChange={valueChange} required>
                <option value="">Select a breed</option>
                {breed.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Control>
              <FormControl.Feedback type="invalid">Please select a breed.</FormControl.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Hypoallergenic</Form.Label>
                <Form.Check type="checkbox" checked={hypoallergenic} onChange={() => setHypo(!hypoallergenic)} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Neutered/Spayed</Form.Label>
                <Form.Check type="checkbox" checked={neutered} onChange={() => setNeutered(!neutered)} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Health issues</Form.Label>
                <Form.Check type="checkbox" checked={health} onChange={() => setHealth(!health)} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Check>
                  <FormCheck.Input type="radio" name="gender" value="M" onChange={valueChange} required />
                  <FormCheck.Label>Male</FormCheck.Label>
                </Form.Check>
                <Form.Check>
                  <FormCheck.Input type="radio" name="gender" value="F" onChange={valueChange} required />
                  <FormCheck.Label>Female</FormCheck.Label>
                  <FormControl.Feedback type="invalid">Plesae select a gender.</FormControl.Feedback>
                </Form.Check>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Size</Form.Label>
                <Form.Check>
                  <FormCheck.Input type="radio" name="size" value="XS" onChange={valueChange} required />
                  <FormCheck.Label>XS</FormCheck.Label>
                </Form.Check>
                <Form.Check>
                  <FormCheck.Input type="radio" name="size" value="S" onChange={valueChange} required />
                  <FormCheck.Label>S</FormCheck.Label>
                </Form.Check>
                <Form.Check>
                  <FormCheck.Input type="radio" name="size" value="M" onChange={valueChange} required />
                  <FormCheck.Label>M</FormCheck.Label>
                </Form.Check>
                <Form.Check>
                  <FormCheck.Input type="radio" name="size" value="L" onChange={valueChange} required />
                  <FormCheck.Label>L</FormCheck.Label>
                </Form.Check>
                <Form.Check>
                  <FormCheck.Input type="radio" name="size" value="XL" onChange={valueChange} required />
                  <FormCheck.Label>XL</FormCheck.Label>
                  <FormControl.Feedback type="invalid">Please select a size.</FormControl.Feedback>
                </Form.Check>
              </Form.Group>
            </Form.Row>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button className={classes.submitButton} variant="outlined" type="submit">Add</Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

AddDogModal.propTypes = {
  setAddDog: PropTypes.func,
  addDog: PropTypes.bool,
  currentUserID: PropTypes.number,
};

AddDogModal.defaultProps = {
  setAddDog: null,
  addDog: false,
  currentUserID: null,
};

export default AddDogModal;
