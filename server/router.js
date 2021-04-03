const router = require("express").Router();
const controller = require("./controller");
module.exports = router;

router.route("/users/my-profile").get(controller.getMyProfile);

router.route("/users/random-profile").get(controller.getRandomProfile);
