const res = require("express/lib/response");
const Feed=require("../models/feed")

async function Moderatorcontroller(req,res){
    try{
        if(!req.user.is_Admin)
        res.status(401).json({message:"Only Admins can delete posts"});
  const id=req.params.id;
  const deleted= await Feed.findByIdAndDelete(id);
   if(!deleted)
   throw new Error("Something went wrong");
   res.status(200).json({message:"Post Deleted Successfully"});
}  catch(err){
    res.status(400).json({message:""+err});
}
}
module.exports=Moderatorcontroller;