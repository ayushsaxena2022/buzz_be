const router = require("express").Router();
const friendscontroller=require("../controllers/friendscontroller");

router.post("/addfriend/:friendsid",friendscontroller.addFriend);
router.get("/getFriendRequests",friendscontroller.getFriendRequests);
router.post("/acceptRequest/:friendsid",friendscontroller.acceptRequest);

router.post("/unFriend/:friendsid",friendscontroller.unFriend);
router.get("/getFriends",friendscontroller.getFriends);
router.post("/cancelRequest/:friendsid",friendscontroller.cancelRequest);
router.post("/deleteRequest/:friendsid",friendscontroller.deleteRequest);
module.exports = router;
