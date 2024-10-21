const Video =require('../modals/video');

//add video
exports.addVideo=async(req,res)=>{
   try {
    const {title,description,videoLink,videoType,thumbnail}=req.body;
    const videoUpload =new Video({user:req.user._id,title,description,videoLink,videoType,thumbnail})
    await videoUpload.save()
    res.status(200).json({success:'true',videoUpload})
   } catch (error) {
    res.status(500).json({error:'Server error'})
   }
}
//getall video
exports.getAllVideo=async(req,res)=>{
    try {
        const videos =await Video.find().populate('user','channelName profilePic userName createdAt')//populates some of the fields from user to videos schema
        res.status(201).json({success:"true","videos":videos})
    } catch (error) {
        res.status(500).json({error:'Server error'})
    }
}

//get videos by video id
exports.getVideoById =async(req,res)=>{
    try {
        const {id}=req.params;
        const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt')
        res.status(201).json({success:"true","video":video})
    } catch (error) {
        res.status(500).json({error:'Server error'})
    }
}

//getallvideos based on user id
exports.getAllVideoByUserID =async(req,res)=>{
    try {
        const {userId}=req.params;
        //will go to the video schema and find user field with userId
        const video =await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about')//uploaded videos from a specific user
        res.status(201).json({success:"true","video":video})
    }catch(error){
        res.status(500).json({error:'Server error'})
    }
}

exports.getVideoLikes=async(req,res)=>{
    try {
        const video =await Video.findById(req.params.id);
        if(video.likedBy.includes(req.user._id)){
           return res.status(400).json({message:"User has already liked this post"})
        }
        video.like+=1;
        video.likedBy.push(req.user._id);
        const updatedPost=await video.save()
        res.status(201).json({message:"Liked successfully",updatedPost})
    } catch (error) {
        res.status(500).json({message:"Failed to like post"})
    }
}

exports.getVideoDislikes=async(req,res)=>{
    try {
        const video =await Video.findById(req.params.id);
        if(!video.likedBy.includes(req.user._id)){
           return res.status(400).json({message:"User has not liked this post yet"}) 
        }
        video.like-=1;
        video.dislike+=1
        video.likedBy =video.likedBy.filter(userId =>userId.toString() !==req.user._id.toString())
        const updatedPost = await video.save();
        return res.status(201).json({message:"disliked successfully",updatedPost})   
    } catch (error) {
        console.log("dislike err:",error)
        res.status(500).json({message:"Failed to get disliked post",error})
    }
}

exports.getTotalLikes = async (req, res) => {
    try {
        // Find the video by its ID from the request parameters
        const video = await Video.findById(req.params.id);

        // Check if the video exists
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Calculate the total number of likes (assuming the 'likedBy' array holds user IDs of those who liked the video)
        const totalLikes = video.likedBy.length;

        // Send the total likes count as a response
        return res.status(200).json({ message: "Total likes fetched successfully", totalLikes });
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching total likes:", error);

        // Send an error response
        return res.status(500).json({ message: "Failed to fetch total likes", error: error.message || error });
    }
};
