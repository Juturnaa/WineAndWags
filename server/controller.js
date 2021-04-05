const dbHelpers = require('./db/dbHelpers');

const controller = {
  getMyProfile: (req, res) => {
    dbHelpers.getMyProfile(req, res);
  },
  getRandomProfile: (req, res) => {
    dbHelpers.getRandomProfile(req, res);
  },
  getPhotos: (req, res) => {
    dbHelpers.getPhotos(req, (err, results) => {
      if (err) res.status(404).send(err);
      res.status(202).send(results.rows);
    });
  },
  editOwnerProfile: (req, res) => {
    dbHelpers.editOwnerProfile(req, (err, results) => {
      if (err) res.status(404).send(err);
      res.status(202).send('Success!');
    });
  },
  editDogProfile: (req, res) => {
    dbHelpers.editDogProfile(req, (err, results) => {
      if (err) res.status(404).send(err);
      res.status(202).send('Success!');
    });
  },
  uploadPhotos: (req, res) => {
    dbHelpers.uploadPhotos(req, (err, result) => {
      if (err) res.status(404).send(err);
      res.status(202).send('Success!');
    });
  },
  uploadDogPhotos: (req, res) => {
    dbHelpers.uploadDogPhotos(req, (err, result) => {
      if (err) res.status(404).send(err);
      res.status(202).send('Success!');
    });
  },
  removePhotos: (req, res) => {
    dbHelpers.removePhotos(req, (err, results) => {
      if (err) res.status(404).send(err);
      res.status(202).send('Success!');
    });
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
      else res.status(200).send('Created new convo!');
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
  // PROFILE LIKES ------------------------------------//
  getProfileLikes: (req, res) => {
    dbHelpers.getProfileLikes(req.params.user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results.rows);
    });
  },
  postNewProfileLike: (req, res) => {
    dbHelpers.postNewProfileLike(req.params.user_id, req.body.liked_user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send('Profile liked!');
    });
  },
};

module.exports = controller;
