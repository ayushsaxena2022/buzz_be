const Users = require("../models/users");

     async function cancelRequest(req,res){         //for rejection of friend request from receiver
     try{
     const friendsid=req.params.friendsid;
     if (!mongoose.Types.ObjectId.isValid(friendsid))
     return res.status(404).send(`Not a valid id: ${friendsid}`);
     const me=await Users.findById(req.user_id);
     const friend=await Users.findById(friendsid) ;
     if(!friend)
     return res.status(401).json({message:"User dont exist"});
     if(!me.friends. myFriendRequests.includes(friendsid)){
     return res.status(400).json({message:"Already not in requests list"});}
     me.friends.myFriendRequests=me.friends.myFriendRequests.filter((request)=>request.toString()!==friendsid);
     friend.friends.mySentRequests=friend.friends.mySentRequests.filter((request)=>request.toString()!==me._id.toString());
     await me.save();
     await friend.save();
     res.status(201).json({message:"Request cancelled"});}
     catch(err){
     res.status(400).json({message:" "+err});  
     }}

     async function unFriend(req,res){
     try{
     const friendsid=req.params.friendsid;
     if (!mongoose.Types.ObjectId.isValid(friendsid))
     return res.status(404).send(`Not a valid id: ${friendsid}`);
     const me=await Users.findById(req.user_id);
     const friend=await Users.findById(friendsid) ;
     if(!friend)
     return res.status(401).json({message:"User dont exist"});
     if(!me.friends.myFriends.includes(friendsid))
     return res.status(400).json({message:"Already not friends"});
     me.friends.myFriends= me.friends.myFriends.filter((friends)=>friends.toString()!==friendsid);
     friend.friends.myFriends=friend.friends.myFriends.filter((friends)=>friends.toString()!==me._id.toString());
     await me.save();
     await friend.save();
     res.status(201).json({message:"UnFriended"})}
     catch(err){
     res.status(400).json({message:" "+err}); 
     }}

     async function getFriends(req,res){
     try{
     const me=await Users.findById(req.user_id);
     const myFriends=me.friends.myFriends;
     res.status(200).json(myFriends)}
     catch(err){
     res.status(400).json({message:" "+err});   
     }}

     async function deleteRequest(req,res){               //for deletion of friend request from sender
     try{
     const friendsid=req.params.friendsid;
     if (!mongoose.Types.ObjectId.isValid(friendsid))
     return res.status(404).send(`Not a valid id: ${friendsid}`);
     const me=await Users.findById(req.user_id);
     const friend=await Users.findById(friendsid) ;
     if(!friend)
     return res.status(401).json({message:"User dont exist"});  
     if(friend.friends.myFriends.includes(me._id.toString()))
     return res.status(400).json({message:"Already friends"});
     if(!me.friends.mySentRequests.includes(friendsid))
     return res.status(400).json({message:"Already not in requests list"});
     me.friends.mySentRequests=me.friends.mySentRequests.filter((request)=>request.toString()!==friendsid);
     friend.friends.myFriendRequests=friend.friends.myFriendRequests.filter((request)=>request.toString()!==me._id.toString());
     await me.save();
     await friend.save();
     res.status(201).json({message:"Request cancelled"});
     }catch(err){
     res.status(400).json({message:" "+err});   
     }}
     module.exports.getFriends=getFriends;
     module.exports.cancelRequest=cancelRequest;
     module.exports.unFriend=unFriend;
     module.exports.deleteRequest=deleteRequest;
