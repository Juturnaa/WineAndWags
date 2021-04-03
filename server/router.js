const router = require('express').Router();
const controller = require('./controller');

module.exports = router;

router
  .route('/users/my-profile/:email')
  .get(controller.getMyProfile)
  .patch(controller.editOwnerProfile);

router
  .route('/users/my-profile/:dogid')
  .patch(controller.editDogProfile);

router.route('/users/random-profile').get(controller.getRandomProfile);

// DOG INFORMATION
[
//   { id: 0,
//     owner_id: 1,
//     name: '',
//     ...,
//     dog_info: [{ ... }, { ... }]
//   },
//   { id: 1,
//     owner_id: 2,
//     dog_info: [{ ... }]},
//     ...
// ]
