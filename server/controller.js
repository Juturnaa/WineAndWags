const dbHelpers = require("./db/dbHelpers");

const controller = {
  getMyProfile: (req, res) => {
    dbHelpers.getMyProfile(req, res);
  },
  getRandomProfile: (req, res) => {
    dbHelpers.getRandomProfile(req, res);
  },
  // MESSAGES ------------------------------------//
  getAllConvos: (req, res) => {
    dbHelpers.getAllConvos(req.params.user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results.rows);
    });
  },
  postNewConvo: (req, res) => {
    dbHelpers.postNewConvo(req.params.user_id, req.body.recipient_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(res);
    });
  },
  getConvoMessages: (req, res) => {
    dbHelpers.getConvoMessages(req.params.user_id, req.params.recipient_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results.rows);
    });
  },
  postMessage: (req, res) => {
    dbHelpers.postMessage(req.params.user_id, req.params.recipient_id, req.body, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send('Message sent!');
    });
  },
};

module.exports = controller;
