import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// fix bug of the Modal -> need to do z-index: Bootstrap React carousel is on top of the modal

function AddDogModal({ setAddDog, addDog }) {
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

  return (
    <div>
      <Modal appElement={document.getElementById('app')} isOpen={addDog} onRequestClose={() => setAddDog(!addDog)}>
        <div id="modalAddDog">
          <form>
            <div>
              Photo:
              {' '}
              <input type="file" name="url" id="fileinput" onChange={(e) => setDogImgUpload(e.target.value)} />
            </div>
            <div>
              Name:
              {' '}
              <input type="text" name="name" onChange={valueChange} />
            </div>
            <div>
              M
              {' '}
              <input type="radio" name="gender" value="M" onChange={valueChange} />
              F
              {' '}
              <input type="radio" name="gender" value="F" onChange={valueChange} />
            </div>
            <div>
              Hypoallergenic
              {' '}
              <input type="checkbox" onChange={() => setHypo(!hypoallergenic)} />
            </div>
            <div>
              Neutered/Spayed
              {' '}
              <input type="checkbox" onChange={() => setNeutered(!neutered)} />
            </div>
            <div>
              Age
              {' '}
              <input type="text" name="age" onChange={valueChange} />
            </div>
            <div>
              Size:
              {' '}
              <br />
              XS
              {' '}
              <input type="radio" name="size" value="XS" onChange={valueChange} />
              S
              {' '}
              <input type="radio" name="size" value="S" onChange={valueChange} />
              M
              {' '}
              <input type="radio" name="size" value="M" onChange={valueChange} />
              L
              {' '}
              <input type="radio" name="size" value="L" onChange={valueChange} />
              XL
              {' '}
              <input type="radio" name="size" value="XL" onChange={valueChange} />
            </div>
            <div>
              Healthy
              {' '}
              <input type="checkbox" onChange={() => setHealth(!health)} />
            </div>
          </form>
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
