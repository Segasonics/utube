import {  useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Routes,Route } from 'react-router-dom'
import Video from './Pages/Video/Video';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import Signup from './Pages/Signup/Signup';

function App() {
  const[sideNavbar,setSideNavbar]=useState(true);


  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value)
  }

  
  return (
    <div className="App">
     <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
     <Routes>
      <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
      <Route path='/watch/:id' element={<Video />}/>
      <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />}/>
      <Route path='/:id/upload' element={<VideoUpload />} />
      <Route path='/signup' element={<Signup />} />
     </Routes>
    </div>
  );
}

export default App;
