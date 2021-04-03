const dbHelpers = require("./db/dbHelpers");

const controller = {
  getMyProfile: (req, res) => {
    dbHelpers.getMyProfile(req, res);
  },
  getRandomProfile: (req, res) => {
    dbHelpers.getRandomProfile(req, res);
  },
};

module.exports = controller;
