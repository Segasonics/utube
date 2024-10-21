var express= require("express");
var app = express();
const cookieParser = require('cookie-parser')
const cors =require('cors')

var port =4000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000', 'https://yutuber.netlify.app'],
    credentials:true
}))
require('./connection/conn');

const authRoute =require('./routes/user');
const videoRoute=require('./routes/video');
const commentRoute=require('./routes/comment')

app.use('/auth',authRoute);
app.use('/api',videoRoute);
app.use('/commentapi',commentRoute)

app.listen(port,()=>{
    console.log("Server started on port : ",port)
})