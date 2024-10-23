const jwt = require('jsonwebtoken');
const User =require('../modals/user');


const auth =async(req,res,next)=>{
    const token =req.cookies.token;
    console.log(token)
    if(!token){
        return res.status(401).json({error:'No token, authorization denied'})
    }else{
        try {
            const decode = jwt.verify(token,"TheLordIsMyShepherd");
            req.user =await User.findById(decode.userId).select('-password');
            next()
        } catch (error) {
            res.status(401).json({error:"Token is not valid"})
        }
    }
}

module.exports =auth