const express =require('express');
const router =express.Router();
const videoController = require("../controllers/video");
const auth =require("../middleware/auth")

router.route('/video').post(auth,videoController.addVideo);
router.route('/allvideos').get(videoController.getAllVideo);
router.route('/getvideobyid/:id').get(videoController.getVideoById);
router.route('/:userId/channel').get(videoController.getAllVideoByUserID);
router.route('/:id/like').put(auth,videoController.getVideoLikes);
router.route('/:id/dislike').put(auth,videoController.getVideoDislikes)
router.route('/getTotalLikes/:id').get(videoController.getTotalLikes)
module.exports =router