import React, { useState } from 'react'
import "./Login.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'

const Login = ({ closeLoginModal }) => {
  const [loginField, setLoginField] = useState({ "userName": "", "password": "" })
  const [loader,setLoader]=useState(false)

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const { data } = await axios.post('https://utube-cvn8.onrender.com/auth/signin', loginField,{withCredentials:true})
      console.log(data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("userProfilePic", data.user.profilePic);
      window.location.reload()
      setLoader(false)
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "top-center"
      })
      console.log(error);
      setLoader(false)
    }
  }
  return (
    <>
      <div className='login'>
        <div className="login_card">
          <div className="titleCard_login">
            <YouTubeIcon sx={{ fontSize: '54px' }} className='login_youtubeImage' />Login
          </div>
          <form onSubmit={handleLogin}>
            <div className="loginCredentials">

              <div className="userNameLogin">
                <input className='userNameLoginUserName' placeholder='UserName' type='text' value={loginField.username} onChange={(e) => handleOnChangeInput(e, "userName")} />
              </div>
              <div className="userNameLogin">
                <input className='userNameLoginUserName' placeholder='Password' type='password' value={loginField.password} onChange={(e) => handleOnChangeInput(e, "password")} />
              </div>
            </div>

            <div className="login_buttons">
              <button type='submit' className="login-btn">Login</button>
              <Link to={'/signup'} onClick={closeLoginModal} className="login-btn">SignUp</Link>
              <button className="login-btn" onClick={closeLoginModal}>Cancel</button>
            </div>
          </form>
          {loader && <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>}
        </div>
        <ToastContainer />
      </div >
    </>
  )
}

export default Login

