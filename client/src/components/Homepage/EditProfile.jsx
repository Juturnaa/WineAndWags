import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function EditProfile({ currentUser, currentPhoto }) {
  const [humanValue, setHuman] = useState({
    name: '', gender: '', bio: '', email: '', password: '', age: '', zipcode: '', searched_as: '',
  });
  const [dogValue, setDog] = useState({});

  console.log(humanValue);

  const valueChange = (e) => {
    setHuman({ ...humanValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form id="editHuman">
        <div>
          Name:
          {' '}
          <br />
          <input type="text" name="name" onChange={valueChange} />
        </div>
        <div>
          Gender:
          {' '}
          <br />
          Male:
          {' '}
          <input type="radio" name="gender" value="m" />
          Female:
          {' '}
          <input type="radio" name="gender" value="f" />
          Non-Binary:
          {' '}
          <input type="radio" name="gender" value="nb" />
        </div>
        <div>
          Bio:
          {' '}
          <br />
          <textarea rows="4" cols="50" name="bio" onChange={valueChange} />
        </div>
        <div>
          E-mail:
          {' '}
          <br />
          <input type="text" name="email" />
        </div>
        <div>
          Password:
          {' '}
          <br />
          <input type="text" name="password" />
        </div>
        <div>
          Zipcode:
          {' '}
          <br />
          <input type="text" name="zipcode" />
        </div>
        <div>
          Search as:
          {' '}
          <br />
          Male:
          {' '}
          <input type="radio" name="searched_as" value="m" />
          Female:
          {' '}
          <input type="radio" name="searched_as" value="f" />
          Non-Binary:
          {' '}
          <input type="radio" name="searched_as" value="nb" />
        </div>
      </form>
      <form id="editDog" />
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
};

EditProfile.defaultProps = {
  currentUser: {},
  currentPhoto: [],
};

export default EditProfile;
