/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogContentText, DialogActions, DialogTitle,
} from '@material-ui/core';
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
    display: 'flex',
    justifyContent: 'center',
  },
});

function ReviewModal({ reviewModal, setReviewModal, appointment }) {
  const classes = useStyles();
  const [rating, setRate] = useState();
  const [tempRate, setTemp] = useState(null);
  const [alert, setAlert] = useState();

  useEffect(() => {
    const rate = {};
    for (let i = 0; i < appointment.length; i++) {
      const currDogs = appointment[i].dogs;
      for (let j = 0; j < currDogs.length; j++) {
        rate[`${currDogs[j].id}`] = currDogs[j].rating;
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
      setAlert(!alert);
      const keys = Object.keys(tempRate);
      const values = Object.values(tempRate);
      const promises = [];
      for (let i = 0; i < keys.length; i++) {
        promises.push(axios.patch(`/app/ratings/${keys[i]}`, { rating: values[i] }));
      }
      promises.push(axios.patch(`/app/dates/${appointment[0].id}`));
      axios.all(promises)
        .then((...results) => console.log('success'))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      {alert ? (
        <Dialog open={alert} onClose={() => setAlert(false)}>
          <DialogTitle>Thank you</DialogTitle>
          <DialogContentText>
            You reviews have been submitted!
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setAlert(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null }
      <Modal style={customStyles} appElement={document.getElementById('app')} isOpen={reviewModal}>
        <div id="reviewModal-container">
          <Form onSubmit={handleSubmit}>
            {appointment.map((item, index) => (
              <div className="review" key={index}>
                <h5>{`Did ${item.name}'s dog behave on the date?`}</h5>
                {item.dogs.map((ite, ind) => (
                  <div className="review" key={ind}>
                    <div><b>{ite.name}</b></div>
                    <Form.Group>
                      <Form.Check type="radio" label="Yes" value={+1} name={ite.id} onChange={ratingChange} />
                      <Form.Check type="radio" label="No" value={-1} name={ite.id} onChange={ratingChange} />
                    </Form.Group>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button className={classes.button} type="submit">Submit Rating</Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
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
