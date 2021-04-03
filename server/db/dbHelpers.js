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
    // let qryStr = `SELECT * FROM waw.users WHERE email = '${email}'`;
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
  editOwnerProfile: (req, callback) => {
    const {
      name, gender, bio, email, password, age, zipcode, searched_as,
    } = req.body;
    const qryStr = `UPDATE waw.users SET name='${name}', gender='${gender}', bio='${bio}', email='${email}', password='${password}', age=${age}, zipcode='${zipcode}', searched_as='${searched_as}' WHERE email='${req.params.email}'`;
    console.log(qryStr);
    // db.query(qryStr, (err, results) => callback(err, results));
  },
  editDogProfile: (req, callback) => {},

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

// WITH answersphotos AS (
//     SELECT
//       a.id as answer_id,
//       a.question_id,
//       a.body,
//       a.date_written as date,
//       a.answerer_name,
//       a.helpful as helpfulness,
//       COALESCE(json_agg(
//         json_build_object('id', p.id, 'url', p.url))
//         FILTER (WHERE p.id IS NOT NULL), '[]'
//       ) AS photos
//       FROM qa.answers a
//       LEFT JOIN qa.photos p ON p.answer_id = a.id
//       WHERE a.product_id = ${params.product_id}
//       GROUP BY a.id
//   )
//   SELECT
//     q.id AS question_id,
//     q.body AS question_body,
//     q.date_written AS question_date,
//     q.asker_name,
//     q.helpful AS question_helpfulness,
//     q.reported,
//     COALESCE(json_object_agg(a.answer_id,
//       json_build_object('id', a.answer_id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', a.photos))
//       FILTER (WHERE a.answer_id IS NOT NULL), '[]'
//     ) AS answers
//     FROM qa.questions q
//     LEFT JOIN answersphotos
