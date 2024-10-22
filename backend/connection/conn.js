const mongoose =require("mongoose");

//youtubeBackend

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('Db connection successfull')).catch((err)=>console.log(err))