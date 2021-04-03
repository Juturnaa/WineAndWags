const router = require('express').Router();
const controller = require('./controller');

module.exports = router;

router.route('/users/my-profile').get(controller.getMyProfile);

router.route('/users/random-profile').get(controller.getRandomProfile);

router.route('/users/my-profile/:email').get(controller.getMyProfile);

// MESSAGES ------------------------------------//
router
  .route('/:user_id/convos')
  .get(controller.getAllConvos)
  .post(controller.postNewConvo);

router
  .route('/:user_id/convos/:convo_id')
  .get(controller.getConvoMessages)
  .post(controller.postMessage);
