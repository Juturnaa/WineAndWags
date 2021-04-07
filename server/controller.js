const dbHelpers = require('./db/dbHelpers');
const upload = require('./file-upload');

const singleUpload = upload.single('image');

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
    singleUpload(req, res, (err) => {
      if (err) res.status(422).send(err);
      else {
        dbHelpers.uploadPhotos(req, req.file.location, (error) => {
          if (error) res.status(404).send(error);
          else res.status(202).send('Success!');
        });
      }
    });
  },
  uploadDogPhotos: (req, res) => {
    singleUpload(req, res, (err) => {
      if (err) res.status(422).send(err);
      else {
        dbHelpers.uploadDogPhotos(req, req.file.location, (err, result) => {
          if (err) res.status(404).send(err);
          res.status(202).send('Success!');
        });
      }
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
    dbHelpers.postNewConvo(
      req.params.user_id,
      req.body.recipient_id,
      (err, results) => {
        if (err) res.status(400).send(err);
        else res.status(200).send('Created new convo!');
      },
    );
  },
  getConvoMessages: (req, res) => {
    dbHelpers.getConvoMessages(
      req.params.user_id,
      req.params.recipient_id,
      (err, results) => {
        if (err) res.status(400).send(err);
        else res.status(200).send(results.rows);
      },
    );
  },
  postMessage: (req, res) => {
    dbHelpers.postMessage(
      req.params.user_id,
      req.params.recipient_id,
      req.body,
      (err, results) => {
        if (err) res.status(400).send(err);
        else res.status(200).send('Message sent!');
      },
    );
  },
  // PROFILE LIKES AND MATCHES------------------------------------//
  // getAllProfileLikes: (req, res) => {
  //   dbHelpers.getAllProfileLikes((err, results) => {
  //     if (err) res.status(400).send(err);
  //     else res.status(200).send(results.rows);
  //   });
  // },
  getProfileLikes: (req, res) => {
    dbHelpers.getProfileLikes(req.params.user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results.rows);
    });
  },
  postNewProfileLike: (req, res) => {
    dbHelpers.postNewProfileLike(
      req.params.user_id,
      req.body.liked_user_id,
      (err, results) => {
        if (err) res.status(400).send(err);
        else res.status(200).send('Profile liked!');
      },
    );
  },
  postNewPhotoLike: (req, res) => {
    dbHelpers.postNewProfileLike(
      req.params.user_id,
      req.body.liked_photo_id,
      (err, results) => {
        if (err) res.status(400).send(err);
        else res.status(200).send('Photo liked!');
      },
    );
  },
  getMatches: (req, res) => {
    dbHelpers.getMatches(req.params.user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results.rows);
    });
  },
  getProfile: (req, res) => {
    dbHelpers.getProfile(req.params.user_id, (err, results) => {
      if (err) res.status(400).send(err);
      else res.status(200).send(results.rows);
    });
  },
  // FILTERS //
  getSavedFilters: (req, res) => {
    dbHelpers.getSavedFilters(req.params.user_id, (err, results) => {
      err ? res.status(400).send(err) : res.status(200).send(results.rows);
    });
  },
  updateSavedFilters: (req, res) => {
    dbHelpers.updateSavedFilters(req.params.user_id, req, (err, results) => {
      err ? res.status(404).send(err) : res.status(202).send('Updated');
    });
  },
  postFilters: (req, res) => {
    dbHelpers.postFilters(req, res);
  },
  // REGISTRATION //
  postUser: (req, res) => {
    dbHelpers.postUser(req, res);
  },
  postDog: (req, res) => {
    dbHelpers.postDog(req, res);
  },

};

module.exports = controller;
