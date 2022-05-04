const router = require("express").Router();
const friendscontroller=require("../controllers/friendscontroller");

router.post("/addfriend/:friendsid",friendscontroller.addFriend);
router.get("/getFriendRequests",friendscontroller.getFriendRequests);
router.post("/acceptRequest/:friendsid",friendscontroller.acceptRequest);

module.exports = router;
