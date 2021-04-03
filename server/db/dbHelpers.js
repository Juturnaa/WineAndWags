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
        res.send(data.rows);
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
