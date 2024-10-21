import React,{useState,useEffect} from 'react'
import "./Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link,useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import axios from 'axios';

const Navbar = ({setSideNavbarFunc,sideNavbar}) => {
    const[userPic,setUserPic]=useState("https://i.pinimg.com/280x280_RS/2a/4b/6a/2a4b6a9ef424a1188f50e77ac2b1baed.jpg");
    const[navbarModel,setNavbarModel]=useState(false);
    const[login,setLogin]=useState(false)
    const[isLoggedIn,setIsLoggedIn]=useState(false)
    const navigate=useNavigate()
    const id =localStorage.getItem("userId")

    const sideNavbarFunc=()=>{
      setSideNavbarFunc(!sideNavbar)
    }

    const handleProfile=()=>{
      navigate(`/user/${id}`);
      setNavbarModel(false)
    }

    const getLogoutFunc=async()=>{
     try {
      const data=await axios.post('https://utube-cvn8.onrender.com/auth/logout',{},{withCredentials:true});
      console.log(data)
     } catch (error) {
      console.log(error)
     }
    }
   
    const onclickOfPopUpOption=(value)=>{
      setNavbarModel(false)
       if(value ==="login"){
        setLogin(true)
       }else{
          localStorage.clear()
          getLogoutFunc();
          setTimeout(() => {
            navigate('/')
            window.location.reload()
          }, 1000);
       }
    }

    const closeLoginModal=()=>{
      setLogin(false)
    }
    
    useEffect(()=>{
      let userProfilePic =localStorage.getItem("userProfilePic");
      setIsLoggedIn(localStorage.getItem("userId")!==null?true:false);
      if(userProfilePic!==null){
        setUserPic(userProfilePic)
      }
    },[])

  return (
    <div className="navbar">

      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFunc}>
            <MenuIcon sx={{color:"white"}} />
        </div>
        <Link to={'/'} className="navbar_youtubeImg">
            <YouTubeIcon sx={{fontSize:"34px"}} className='navbar_youtubeImage' />
            <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      <div className="navbar-middle">
        <div className="navbar_searchBox">
            <input type='text' placeholder='Search' className='navbar_searchBoxInput' />
            <div className="navbar_searchIconBox">
                <SearchIcon sx={{fontSize:"28px",color:"white"}} />
            </div>
        </div>
        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{color:"white"}} />
        </div>
      </div>

      <div className="navbar-right">
        <Link to={'/123/upload'}>
        <VideoCallIcon sx={{color:"white",fontSize:"30px",cursor:"pointer"}} />
        </Link>
        <NotificationsIcon sx={{color:"white",fontSize:"28px",cursor:"pointer"}} />
        <img className='navbar-right-logo' src={userPic} alt="logo" onClick={()=>setNavbarModel(!navbarModel)}/>
       {navbarModel && <div className="navbar-modal">
            {isLoggedIn && <div className="navbar-modal-option" onClick={handleProfile}>Profile</div>}
            {isLoggedIn && <div className="navbar-modal-option" onClick={()=>onclickOfPopUpOption("logout")}>Logout</div>}
           {!isLoggedIn && <div className="navbar-modal-option" onClick={()=>onclickOfPopUpOption("login")}>Login</div>}
        </div>}
      </div>

      {
        login && <Login closeLoginModal={closeLoginModal} />
      }
    </div>
  )
}

export default Navbar
