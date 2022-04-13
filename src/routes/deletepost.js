const router = require("express").Router();
const moderatorcontroller=require("../controllers/moderatorcontroller");
const authenticate=require("../middleware/authenticate");

router.post("/",authenticate,moderatorcontroller);
module.exports = router;
