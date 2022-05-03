const router = require("express").Router();
const friendscontroller=require("../controllers/friendscontroller");

router.post("/unFriend/:friendsid",friendscontroller.unFriend);
router.get("/getFriends",friendscontroller.getFriends);
router.post("/cancelRequest/:friendsid",friendscontroller.cancelRequest);
router.post("/deleteRequest/:friendsid",friendscontroller.deleteRequest);
module.exports = router;
