const express =require('express');
const router =express.Router();
const auth =require('../middleware/auth')
const commentController =require("../controllers/comment")

router.route('/addcomment').post(auth,commentController.addComment);
router.route('/comment/:videoId').get(commentController.getCommentByVideoId)

module.exports =router;