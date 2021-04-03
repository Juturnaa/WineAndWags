const dbHelpers = require("./db/dbHelpers");

const controller = {
  getMyProfile: (req, res) => {
    dbHelpers.getMyProfile(req, res);
  },
  getRandomProfile: (req, res) => {
    dbHelpers.getRandomProfile(req, res);
  },
  getAllConvos: (req, res) => {
    dbHelpers.getAllConvos(req.params.user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results);
    });
  },
  postNewConvo: (req, res) => {
    dbHelpers.postNewConvo(req.params.user_id, req.body.recipient_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send('Created new Convo!');
    });
  },
  getConvoMessages: (req, res) => {
    dbHelpers.getConvoMessages(req, res);
  },
  postMessage: (req, res) => {
    dbHelpers.postMessage(req, res);
  },
};

module.exports = controller;
