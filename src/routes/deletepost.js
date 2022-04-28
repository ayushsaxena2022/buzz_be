const router = require("express").Router();
const moderatorcontroller=require("../controllers/moderatorcontroller");
const authenticate=require("../middleware/authenticate");

router.delete("/:id",authenticate,moderatorcontroller);
module.exports = router;
