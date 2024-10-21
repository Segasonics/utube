import React, { useState } from 'react';
import "./Signup.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://thumbs.dreamstime.com/b/facial-recognition-icon-face-scan-unknown-user-biometric-scanning-eps-file-easy-to-edit-330413987.jpg");
    const navigate =useNavigate()
    const [signUpField, setSignUpField] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "profilePic": uploadedImageUrl });
    const[loader,setLoader]=useState(false)
    const handleInputField = (event, name) => {
        setSignUpField({
            ...signUpField,
            [name]: event.target.value
        });
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');

        try {
            setLoader(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/df2zns80t/image/upload", data);
            setLoader(false)
            setUploadedImageUrl(response.data.url);
            setSignUpField({
                ...signUpField,
                "profilePic": response.data.url
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!signUpField.channelName || !signUpField.userName || !signUpField.password || !signUpField.about) {
            toast.error('All fields are required!');
            return;
        }
        setLoader(true)
        try {
            const{ data }= await axios.post('http://localhost:4000/auth/signup', signUpField);
            toast.success(data.message);
            console.log(data);
            setLoader(false)
            navigate('/')
        } catch (error) {
            toast.error('Error during sign-up. Please try again.',{
                position:"top-right"
            });
            console.log(error);
            setLoader(false)
        }
    };

    return (
        <>
         
        <div className='signup'>
            <div className="signup_card">
                <div className="signUp_title">
                    <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
                    SignUp
                </div>

                {/* Use a form element here */}
                <form onSubmit={handleSignUp}>
                    <div className="signUp_Inputs">
                        <input type="text" className='signUp_Inputs_inp' placeholder='Channel Name' value={signUpField.channelName} onChange={(e) => handleInputField(e, "channelName")} />
                        <input type="text" className='signUp_Inputs_inp' placeholder='User Name' value={signUpField.userName} onChange={(e) => handleInputField(e, "userName")} />
                        <input type="password" className='signUp_Inputs_inp' placeholder='Password' value={signUpField.password} onChange={(e) => handleInputField(e, "password")} />
                        <input type="text" className='signUp_Inputs_inp' placeholder='About Your Channel' value={signUpField.about} onChange={(e) => handleInputField(e, "about")} />

                        <div className="image_upload_signup">
                            <input type="file" onChange={(e) => uploadImage(e)} />
                            <div className="image_upload_signup_div">
                                <img className='image_default_signup' src={uploadedImageUrl} alt="signup-img" />
                            </div>
                        </div>

                        <div className="signUpBtns">
                            {/* Submit button within the form */}
                            <button type="submit" className="signUpBtn">Sign Up</button>
                            <Link to={'/'} className="signUpBtn">Home Page</Link>
                        </div>

                       {loader && <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>}
                    </div>
                </form>
            </div>
            <ToastContainer position='top-center' />
        </div>
       
        </>
    );
};

export default Signup;
