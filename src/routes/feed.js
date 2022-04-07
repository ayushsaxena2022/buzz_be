const router = require("express").Router();
const upload = require("../utils/multer");
const feedController = require("../controllers/feedController.js");
const feedValidation=require('../middleware/feedValidation.js')


router.post("/", upload.single("photos"), feedValidation,feedController.createFeed);

router.get("/", feedController.getFeed);

router.delete("/:id", feedController.deleteFeed);

router.patch("/:id", upload.single("photos"),feedValidation,feedController.updateFeed);
module.exports = router;
