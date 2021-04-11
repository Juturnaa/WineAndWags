import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Button } from '@material-ui/core';
import axios from 'axios';

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

function AddDogModal({ setAddDog, addDog, currentUserID }) {
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

  const valueChange = (e) => {
    setDogValue({ ...dogValue, [e.target.name]: e.target.value });
  };

  const postDog = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', dogImgUpload, dogImgUpload.name);
    const information = dogValue;
    information.hypo = hypoallergenic;
    information.neutered = neutered;
    information.healthy = health;
    axios.post(`/app/dogs/${currentUserID}`, information)
      .then((results) => console.log(results.data)
        // axios.post(`/app/users/my-dog/${results.data}`, fd)
        //   .then((results) => alert(results.data))
        //   .catch((err) => alert('INVALID FILE TYPE. JPG/JPEG/PNG ONLY'))
      )
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Modal style={customStyles} appElement={document.getElementById('app')} isOpen={addDog} onRequestClose={() => setAddDog(!addDog)}>
        <div id="modalAddDog">
          <Form onSubmit={postDog}>
            <div>
              Photo:
              {' '}
              <input type="file" name="url" id="fileinput" onChange={(e) => setDogImgUpload(e.target.files[0])} />
            </div>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control as="input" name="name" onChange={valueChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control as="input" name="age" onChange={valueChange} />
              </Form.Group>
            </Form.Row>
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
                <Form.Check type="radio" name="gender" value="M" label="Male" onChange={valueChange} />
                <Form.Check type="radio" name="gender" value="F" label="Female" onChange={valueChange} />
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
            <Button type="submit">Add</Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

AddDogModal.propTypes = {
  setAddDog: PropTypes.func,
  addDog: PropTypes.bool,
};

AddDogModal.defaultProps = {
  setAddDog: null,
  addDog: false,
};

export default AddDogModal;
