/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    background: 'rgba(221, 200, 196, 0.6)',
    padding: '10px',
  },
};

const useStyles = makeStyles({
  button: {
    color: 'black',
    backgroundColor: '#eff9f0',
    borderColor: '#eff9f0',
  },
});

function ReviewModal({ reviewModal, setReviewModal, appointment }) {
  const classes = useStyles();
  const [rating, setRate] = useState();
  const [tempRate, setTemp] = useState(null);

  useEffect(() => {
    const rate = {};
    for (let i = 0; i < appointment.length; i++) {
      const currDogs = appointment[i].dogs;
      for (let j = 0; j < currDogs.length; j++) {
        rate[`${currDogs[i].id}`] = currDogs[i].rating;
      }
    }
    setRate(rate);
  }, [appointment]);

  const ratingChange = (e) => {
    const sum = Number(rating[e.target.name]) + Number(e.target.value);
    setTemp({ ...tempRate, [e.target.name]: sum });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempRate === null) {
      alert('Please rate dog(s)');
    } else {
      setReviewModal(!reviewModal);
      const keys = Object.keys(tempRate);
      const values = Object.values(tempRate);
      const promises = [];
      for (let i = 0; i < keys.length; i++) {
        promises.push(axios.patch(`/app/ratings/${keys[i]}`, { rating: values[i] }));
      }
      promises.push(axios.patch(`/app/dates/${appointment[0].id}`));
      axios.all(promises)
        .then((...results) => console.log('updated!'))
        .catch((err) => console.error(err));
    }
  };

  return (
    <Modal style={customStyles} appElement={document.getElementById('app')} isOpen={reviewModal}>
      <div id="reviewModal-container">
        {appointment.map((item, index) => (
          <div className="review" key={index}>
            <h5>{`Did ${item.name}'s dog behave on the date?`}</h5>
            {item.dogs.map((ite, ind) => (
              <div className="review" key={ind}>
                <div><b>{ite.name}</b></div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Check type="radio" label="Yes" value={+1} name={ite.id} onChange={ratingChange} />
                    <Form.Check type="radio" label="No" value={-1} name={ite.id} onChange={ratingChange} />
                  </Form.Group>
                  <Button className={classes.button} type="submit">Submit Rating</Button>
                </Form>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
}

ReviewModal.propTypes = {
  setReviewModal: PropTypes.func,
  reviewModal: PropTypes.bool,
  appointment: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
};

ReviewModal.defaultProps = {
  setReviewModal: null,
  reviewModal: false,
  appointment: [],
};

export default ReviewModal;
