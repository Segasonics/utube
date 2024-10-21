const mongoose =require("mongoose");

//youtubeBackend

mongoose.connect('mongodb://localhost:27017/youtubeBackend')
.then(()=>console.log('Db connection successfull')).catch((err)=>console.log(err))