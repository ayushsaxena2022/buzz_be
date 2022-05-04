const Users = require("../models/users");
const mongoose = require("mongoose");

async function addFriend(req, res) {
    try {
        const friendsid = req.params.friendsid;
        if (!mongoose.Types.ObjectId.isValid(friendsid))
            return res.status(404).send(`Not a valid id: ${friendsid}`);
        const user = await Users.findById(req.user_id);
        const friend = await Users.findById(friendsid);
        if (!friend)
            return res.status(401).json({ message: "User dont exist" });

        if (user.friends.myFriendRequests.includes(friendsid))
            return res.status(401).json({ message: "Already Requested" });
        if (user.friends.myFriends.includes(friendsid))
            return res.status(401).json({ message: "Already added as friend" });
        if (user.friends.mySentRequests.includes(friendsid))
            return res.status(401).json({ message: "Request already sent" });

        user.friends.mySentRequests.push(friendsid);
        friend.friends.myFriendRequests.push(req.user_id);
        await user.save();
        await friend.save();
        res.status(201).json({ message: "Request Sent Sucessfully" })
    }
    catch (err) {
        res.status(400).json({ message: " " + err });
    }
}

async function getFriendRequests(req, res) {
    try {
        const user = await Users.findById(req.user_id)
            .populate('friends.myFriendRequests', "firstname lastname profile_img");

        const friendData = user.friends.myFriendRequests
        res.status(200).json(friendData)
    }
    catch (err) {
        res.status(400).json({ message: " " + err });
    }
}

async function acceptRequest(req, res) {         //for accepting of friend request from receiver
    try {
        const friendsid = req.params.friendsid;
        if (!mongoose.Types.ObjectId.isValid(friendsid))
            return res.status(404).send(`Not a valid id: ${friendsid}`);
        const user = await Users.findById(req.user_id);
        const friend = await Users.findById(friendsid);

        if (!friend)
            return res.status(401).json({ message: "User dont exist" });
        if (!user.friends.myFriendRequests.includes(friendsid))
            return res.status(401).json({ message: "Not in request list" });
        if (user.friends.myFriends.includes(friendsid)) {
            return res.status(400).json({ message: "Already a friend" });
        }

        user.friends.myFriendRequests = user.friends.myFriendRequests.filter((request) => request.toString() !== friendsid);
        friend.friends.mySentRequests = friend.friends.mySentRequests.filter((request) => request.toString() !== user._id.toString());

        user.friends.myFriends.push(friendsid);
        friend.friends.myFriends.push(user._id);

        await user.save();
        await friend.save();
        res.status(201).json({ message: "Request accepted" });
    }
    catch (err) {
        res.status(400).json({ message: " " + err });

    }
}






module.exports.addFriend = addFriend;
module.exports.getFriendRequests = getFriendRequests;
module.exports.acceptRequest = acceptRequest;