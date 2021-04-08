/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';

function ReviewModal({ reviewModal, setReviewModal, appointment }) {
  const [rating, setRate] = useState();
  const [tempRate, setTemp] = useState();

  useEffect(() => {
    const rate = {};
    for (let i = 0; i < appointment.length; i++) {
      const currDogs = appointment[i].dogs;
      for (let j = 0; j < currDogs.length; j++) {
        rate[`${currDogs[i].id}`] = currDogs[i].rating;
      }
    }
    setRate(rate);
    setTemp(rate);
  }, [appointment]);

  const ratingChange = (e) => {
    const sum = Number(rating[e.target.name]) + Number(e.target.value);
    setTemp({ ...tempRate, [e.target.name]: sum });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <Modal appElement={document.getElementById('app')} isOpen={reviewModal} onRequestClose={() => setReviewModal(!reviewModal)}>
      <div id="reviewModal">
        {appointment.map((item, index) => (
          <div key={index}>
            <h5>{`Did ${item.name}'s dog behave on the date?`}</h5>
            {item.dogs.map((ite, ind) => (
              <div key={ind}>
                <div><b>{ite.name}</b></div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>
                      Rating
                    </Form.Label>
                    <Form.Check type="radio" label="Yes" value={+1} name={ite.id} onChange={ratingChange} />
                    <Form.Check type="radio" label="No" value={-1} name={ite.id} onChange={ratingChange} />
                  </Form.Group>
                  <Button type="submit">Submit Rating</Button>
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
