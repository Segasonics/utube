const express =require('express');
const router =express.Router();
const UserController=require("../controllers/user")

router.route("/signup").post(UserController.signUp);
router.route('/signin').post(UserController.signIn);
router.route('/logout').post(UserController.logout)

module.exports =router