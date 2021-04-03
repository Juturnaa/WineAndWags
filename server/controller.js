const dbHelpers = require('./db/dbHelpers');

const controller = {
  getMyProfile: (req, res) => {
    dbHelpers.getMyProfile(req, res);
  },
  getRandomProfile: (req, res) => {
    dbHelpers.getRandomProfile(req, res);
  },
  editOwnerProfile: (req, res) => {
    dbHelpers.editProfile(req, (err, results) => {
      if (err) res.status(404).send(err);
      res.status(202).send(results.rows);
    });
  },
};

module.exports = controller;
