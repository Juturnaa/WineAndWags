const router = require('express').Router();
const controller = require('./controller');

module.exports = router;

router
  .route('/users/my-profile/:email')
  .get(controller.getMyProfile)
  .patch(controller.editOwnerProfile);

router
  .route('/users/photos/:id')
  .get(controller.getPhotos)
  .post(controller.uploadPhotos);

router
  .route('/users/my-dog/:dogid')
  .patch(controller.editDogProfile)
  .post(controller.uploadDogPhotos);

router
  .route('/users/delete/:photoid')
  .delete(controller.removePhotos);

router.route('/users/random-profile').get(controller.getRandomProfile);

// MESSAGES ------------------------------------//
router
  .route('/:user_id/convos')
  .get(controller.getAllConvos)
  .post(controller.postNewConvo);

router
  .route('/:user_id/convos/:recipient_id')
  .get(controller.getConvoMessages)
  .post(controller.postMessage);

// PROFILE LIKES ------------------------------------//
// router
//   .route('/profile-likes')
//   .get(controller.getAllProfileLikes);

router
  .route('/:user_id/profile-likes')
  .get(controller.getProfileLikes)
  .post(controller.postNewProfileLike);

router
  .route('/:user_id/matches')
  .get(controller.getMatches);

// FILTERS
router
  .route('/:user_id/filters')
  .get(controller.getSavedFilters)
  .patch(controller.updateSavedFilters);

