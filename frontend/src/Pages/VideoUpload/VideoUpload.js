import React, { useState,useEffect } from 'react'
import "./VideoUpload.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {
    const [inputField, setInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "videoType": "" });
    const[loader,setLoader]=useState(false);
    const navigate =useNavigate()
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value
        })
    }

    const uploadImage = async (e, type) => {
        setLoader(true)
        const files = e.target.files;
        console.log(files)
        const data = new FormData()
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/df2zns80t/${type}/upload`, data)
            const url = response.data.url;
            const duration =response.data.duration;
            console.log(response)
            setLoader(false)
            let val = type === "image" ? "thumbnail" : "videoLink"
            setInputField({
                ...inputField,
                [val]: url,
                ...(duration && { duration })
            })
            if(duration){
                localStorage.setItem('videoDuration',duration)
            }
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    useEffect(()=>{
      let isLogin = localStorage.getItem("userId");
      if(isLogin===null){
        navigate('/')
      }
    },[])

    const handleSubmit=async()=>{
        setLoader(true)
        try {
            const {data}= await axios.post('https://utube-cvn8.onrender.com/api/video',inputField,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },withCredentials:true
            })//only logged in user can access so withcred
            console.log(data)
            setInputField("")
            navigate("/");
            setLoader(false)
        } catch (error) {
            console.error("Error uploading video:", error.response?.data || error.message);
        }
    }
    console.log(inputField)
    return (
        <div className='videoUpload'>
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>

                <div className="uploadForm">
                    <input type="text" value={inputField.title} placeholder='Title of Video' className='uploadFormInputs' onChange={(e) => handleOnChangeInput(e, "title")} />
                    <input type="text" value={inputField.description} placeholder='Description' className='uploadFormInputs' onChange={(e) => handleOnChangeInput(e, "description")} />
                    <input type="text" value={inputField.videoType} placeholder='Category' className='uploadFormInputs' onChange={(e) => handleOnChangeInput(e, "videoType")} />
                    {/* Accepts only image,any image format */}
                    <div>Thumbnail<input type='file' accept='image/*' onChange={(e) => uploadImage(e, "image")} /></div>
                    {/* Accepts only video or any video format */}
                    <div>Video <input type='file' accept='video/mp4,video/webm, video/* ' onChange={(e) => uploadImage(e, "video")} /> </div>
                    {loader && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}
                </div>

              

                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmit}>Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default VideoUpload

