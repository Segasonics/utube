const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    channelName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    about:{
        required:true,
        type:String
    },
    profilePic:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports =mongoose.model('user',userSchema)