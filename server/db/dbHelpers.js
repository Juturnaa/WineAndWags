/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const db = require('./index.js');

// get my profile
// get my photos
// get my dogs

// get random profile
// get random profile photos
// get random profile's dogs

const dbHelpers = {
  getMyProfile: (req, res) => {
    const { email } = req.params;
    const qryStr = `SELECT waw.users.*, json_agg(dogs) dogs_info FROM waw.users
    LEFT JOIN (SELECT waw.dogs.owner_id, json_object_agg(waw.dogs.id, json_build_object(
    'name', waw.dogs.name, 'gender', waw.dogs.gender,
     'bio', waw.dogs.bio, 'hypo', waw.dogs.hypo, 'neutered',
    waw. dogs.neutered, 'rating', waw.dogs.rating, 'age',
     waw.dogs.age, 'size', waw.dogs.size, 'breed', waw.dogs.breed,
     'healthy', dogs.healthy
    )) dogs FROM waw.dogs GROUP BY waw.dogs.owner_id) dogs ON dogs.owner_id = waw.users.id WHERE waw.users.email = '${email}' GROUP BY waw.users.id`;
    db.query(qryStr, (err, data) => {
      if (err) {
        res.status(400).send('something went wrong with your query');
      } else {
        res.send(data.rows[0]);
      }
    });
  },
  getRandomProfile: (req, res) => {},
  getPhotos: (req, callback) => {
    db.query(`SELECT * FROM waw.photos WHERE waw.photos.user_id=${req.params.id}`, (err, results) => { callback(err, results); });
  },
  editOwnerProfile: (req, callback) => {
    const {
      name, gender, bio, email, password, age, zipcode, searched_as,
    } = req.body;
    const qryStr = `UPDATE waw.users SET name='${name}', gender='${gender}', bio='${bio}', email='${email}', password='${password}', age=${age}, zipcode='${zipcode}', searched_as='${searched_as}' WHERE email='${req.params.email}'`;
    db.query(qryStr, (err, results) => callback(err, results));
  },
  editDogProfile: (req, callback) => {
    const {
      name, gender, bio, hypo, neutered, rating, age, size, breed, healthy
    } = req.body;
    const qryStr = `UPDATE waw.dogs SET name=${name}, gender=${gender}, bio=${bio}, hypo=${hypo}, neutered=${neutered}, rating=${rating}, age=${age}, size=${size}, breed=${breed}, healthy=${healthy} WHERE id=${req.params.dogid}`;
    db.query(qryStr, (err, results) => callback(err, results));
  },

  // MESSAGES ------------------------------------//
  getAllConvos: (user_id, callback) => {
    const queryStr = `SELECT * FROM waw.convo WHERE user1 IN (${user_id}) OR user2 IN (${user_id});`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postNewConvo: (user_id, recipient_id, callback) => {
    const queryStr = `INSERT INTO waw.convo (id, user1, user2) VALUES (DEFAULT, ${user_id}, ${recipient_id})`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  getConvoMessages: (user_id, convo_id, callback) => {
    const queryStr = `SELECT * FROM waw.message WHERE convo_id=${convo_id}`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postMessage: (user_id, convo_id, body, callback) => {
    const queryStr = `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id) VALUES (DEFAULT, ${user_id}, '${body.message}', DEFAULT, ${convo_id})`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
};

module.exports = dbHelpers;
