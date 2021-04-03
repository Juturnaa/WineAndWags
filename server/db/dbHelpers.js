const db = require("./index.js");

// get my profile
// get my photos
// get my dogs

// get random profile
// get random profile photos
// get random profile's dogs

const dbHelpers = {
  getMyProfile: (req, res) => {
    let email = req.params.email;
    // let qryStr = `SELECT * FROM waw.users WHERE email = '${email}'`;
    let qryStr = `SELECT waw.users.*, json_agg(json_build_object('dogs', dogs)) dogs_info FROM waw.users
    LEFT JOIN (SELECT waw.dogs.owner_id, json_agg(json_build_object(
    'name', waw.dogs.name, 'gender', waw.dogs.gender,
     'bio', waw.dogs.bio, 'hypo', waw.dogs.hypo, 'neutered',
    waw. dogs.neutered, 'rating', waw.dogs.rating, 'age',
     waw.dogs.age, 'size', waw.dogs.size, 'breed', waw.dogs.breed,
     'healthy', dogs.healthy
    )) dogs FROM waw.dogs GROUP BY waw.dogs.owner_id) dogs ON dogs.owner_id = waw.users.id GROUP BY waw.users.id`;
    db.query(qryStr, (err, data) => {
      if (err) {
        res.status(400).send("something went wrong with your query");
      } else {
        res.send(data);
      }
    });
  },
  getRandomProfile: (req, res) => {},
  // MESSAGES ------------------------------------//
  getAllConvos: (user_id, callback) => {
    const queryStr = `SELECT * FROM waw.convo WHERE user1 IN (${user_id}) OR user2 IN (${user_id});`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postNewConvo: (user_id, recipient_id, callback) => {
    const queryStr = `INSERT INTO waw.convo
    SELECT nextval('waw.convo_id_seq'), ${user_id}, ${recipient_id}
    WHERE
        NOT EXISTS (
            SELECT id FROM waw.convo WHERE user1 in (${user_id}, ${recipient_id}) AND user2 in (${user_id}, ${recipient_id})
        );`;
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
  postMessage: (user_id, recipient_id, body, callback) => {
    const queryStr = `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id) VALUES (DEFAULT, ${user_id}, '${body.message}', DEFAULT, (select id from waw.convo where user1 in (${user_id}, ${recipient_id}) and user2 in (${user_id}, ${recipient_id})))`;
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
