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
    console.log(email);
    const qryStr = `SELECT * FROM waw.users WHERE email = '${email}'`;
    db.query(qryStr, (err, data) => {
      if (err) {
        res.status(400).send('something went wrong with your query');
      } else {
        res.send(data);
      }
    });
  },
  getRandomProfile: (req, res) => {},
  editOwnerProfile: (req, callback) => {

  },
  editDogProfile: (req, callback) => {

  }
};

module.exports = dbHelpers;
