const axios = require('axios');
const dbHelpers = require('./db/dbHelpers');
const upload = require('./file-upload');

const singleUpload = upload.single('image');

const controller = {
  getMyProfile: (req, res) => {
    dbHelpers.getMyProfile(req, res);
  },
  verifyEmail: (req, res) => {
    dbHelpers.verifyEmail(req, res);
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
  // CALENDAR------------------------------------//
  // getSchedule: (req,res) => {
  //   dbHelpers.getSchedule(req, (err,results)=>{
  //     if(err) res.status(400).send(err);
  //     else res.status(200).send("Got Schedule")
  //     }
  //   )
  // }
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

  // Map //
  getYelpResults: (req, res) => {
    let allResults = [];
    let result1;
    const { latitude, longitude } = JSON.parse(req.query.location);
    axios.get('https://api.yelp.com/v3/businesses/search', {
      params: {
        latitude: latitude,
        longitude: longitude,
        categories: 'dog_parks',
      },
      headers: {
        authorization: 'Bearer FCjYuGUU6sDdV4pbWxqy23I_UsG730pGsK6b5euAEsgmoU6l3UVN2YR5WfIhuiDIZAxfwBxulDU7XUoOGXpbAPb__VPZFuOTo5qY4eNNSsf8LpPqe9GiXFp1rFJrYHYx',
      },
    }).then((result) => {
      result1 = result.data;
      axios.get('https://api.yelp.com/v3/businesses/search', {
        params: {
          latitude: latitude,
          longitude: longitude,
          term: 'Off Leash Dog Beaches',
        },
        headers: {
          authorization: 'Bearer FCjYuGUU6sDdV4pbWxqy23I_UsG730pGsK6b5euAEsgmoU6l3UVN2YR5WfIhuiDIZAxfwBxulDU7XUoOGXpbAPb__VPZFuOTo5qY4eNNSsf8LpPqe9GiXFp1rFJrYHYx',
        },
      }).then((result2) => {
        allResults = result1.businesses.concat(result2.data.businesses);
        axios.get('https://api.yelp.com/v3/businesses/search', {
          params: {
            latitude: latitude,
            longitude: longitude,
            categories: 'restaurants',
            attributes: 'pet_friendly',
          },
          headers: {
            authorization: 'Bearer FCjYuGUU6sDdV4pbWxqy23I_UsG730pGsK6b5euAEsgmoU6l3UVN2YR5WfIhuiDIZAxfwBxulDU7XUoOGXpbAPb__VPZFuOTo5qY4eNNSsf8LpPqe9GiXFp1rFJrYHYx',
          },
        }).then((result3) => {
          // res.send(allResults.concat(result3.data.businesses));
          res.send(allResults);
        });
      });
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
