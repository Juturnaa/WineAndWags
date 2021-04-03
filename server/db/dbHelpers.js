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
    console.log(email);
    let qryStr = `SELECT * FROM waw.users WHERE email = '${email}'`;
    db.query(qryStr, (err, data) => {
      if (err) {
        res.status(400).send("something went wrong with your query");
      } else {
        res.send(data);
      }
    });
  },
  getRandomProfile: (req, res) => {},
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
