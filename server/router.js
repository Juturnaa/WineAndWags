const router = require('express').Router();
const controller = require('./controller');

module.exports = router;

router
  .route('/users/my-profile/:id')
  .get(controller.getMyProfile)
  .patch(controller.editOwnerProfile);

router
  .route('/users/login/:email')
  .get(controller.verifyEmail);

router
  .route('/users/photos/:id')
  .get(controller.getPhotos)
  .post(controller.uploadPhotos);

router
  .route('/users/my-dog/:dogid')
  .patch(controller.editDogProfile)
  .post(controller.uploadDogPhotos);

router
  .route('/ratings/:dogid')
  .patch(controller.updateReview);

router.route('/users/delete/:photoid').delete(controller.removePhotos);

router.route('/users/random-profile').get(controller.getRandomProfile);

// REGISTRATION ------------------------------------//
router.route('/users')
  .post(controller.postUser);
router.route('/dogs/:user')
  .post(controller.postDog);

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
router.route('/:user_id/profile').get(controller.getProfile);

router
  .route('/:user_id/profile-likes')
  .get(controller.getProfileLikes)
  .post(controller.postNewProfileLike);

router.route('/:user_id/matches').get(controller.getMatches);

router.route('/:user_id/photo-likes').post(controller.postNewPhotoLike);
// FILTERS
router
  .route('/:user_id/filters')
  .get(controller.getSavedFilters)
  .patch(controller.updateSavedFilters)
  .post(controller.postFilters);

// MAP
router
  .route('/yelp')
  .get(controller.getYelpResults);

// ------------ CALENDAR ---------------- //
router
  .route('/dates/:userid')
  .get(controller.getUserDates)
  .patch(controller.reviewed);
