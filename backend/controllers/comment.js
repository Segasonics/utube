const Comment =require('../modals/comments')

exports.addComment =async(req,res)=>{
    try {
        let {video,message}=req.body;
        const comment= new Comment({user:req.user._id,video,message});
        await comment.save();

        res.status(201).json({message:"success",comment})
    } catch (error) {
        res.status(500).json({error:'Server error'})
    }
}

exports.getCommentByVideoId =async(req,res)=>{
    try {
        let {videoId}=req.params;
        const comments=await Comment.find({video:videoId}).populate('user','channelName profilePic userName createdAt')//videos from the particular video
        res.status(201).json({message:"success",comments})
    } catch (error) {
        res.status(500).json({error:'Server error'})
    }
}