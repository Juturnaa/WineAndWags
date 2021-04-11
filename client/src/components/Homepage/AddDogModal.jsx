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

function AddDogModal({ setAddDog, addDog, currentUserID }) {
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
  const [emailValidate, setEmail] = useState(false);

  const valueChange = (e) => {
    setDogValue({ ...dogValue, [e.target.name]: e.target.value });
  };

  const postDog = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    const fd = new FormData();
    fd.append('image', dogImgUpload, dogImgUpload.name);
    fd.append('owner_id', currentUserID);
    const information = dogValue;
    information.hypo = hypoallergenic;
    information.neutered = neutered;
    information.healthy = health;
    // axios.post(`/app/dogs/${currentUserID}`, information)
    //   .then((results) => axios.post(`/app/users/my-dog/${results.data.id}`, fd)
    //     .then((results) => alert(results.data))
    //     .catch((err) => alert('INVALID FILE TYPE. JPG/JPEG/PNG ONLY')))
    //   .catch((err) => console.error(err));
  };

  return (
    <div>
      <Modal style={customStyles} appElement={document.getElementById('app')} isOpen={addDog} onRequestClose={() => setAddDog(!addDog)}>
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
                <Form.Control as="input" type="text" pattern="[A-Za-z]" name="name" onChange={valueChange} required />
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
              <Form.Control as="select" name="breed" onChange={valueChange}>
                <option>Select a breed</option>
                {breed.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Control>
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
                <Form.Check type="radio" name="gender" value="M" label="Male" onChange={valueChange} isValid />
                <Form.Check type="radio" name="gender" value="F" label="Female" onChange={valueChange} isValid />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Size</Form.Label>
                <Form.Check type="radio" name="size" label="XS" value="XS" onChange={valueChange} />
                <Form.Check type="radio" name="size" label="S" value="S" onChange={valueChange} />
                <Form.Check type="radio" name="size" label="M" value="M" onChange={valueChange} />
                <Form.Check type="radio" name="size" label="L" value="L" onChange={valueChange} />
                <Form.Check type="radio" name="size" label="XL" value="XL" onChange={valueChange} />
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
