import React, { useState, useEffect } from 'react';
import "./Profile.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Profile = ({ sideNavbar }) => {
    const [datas, setDatas] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const fetchProfileData = async () => {
        try {
            const { data } = await axios.get(`https://utube-cvn8.onrender.com/api/${id}/channel`)
            setDatas(data.video)
            console.log(data.video)
            setUser(data.video[0]?.user)
            console.log(data.video[0].user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProfileData()
    }, [id])
    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>

                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img className='profile_top_section_img' src={user?.profilePic} alt="profile-img" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">{user?.channelName}</div>
                        <div className="profile_top_section_info">
                            {user?.userName}. {datas.length} videos
                        </div>
                        <div className="profile_top_section_info">
                            {user?.about}
                        </div>
                    </div>
                </div>

                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>

                    <div className="profileVideos">

                        {
                            datas?.map((data, index) => {
                                return (
                                    <Link to={`/watch/${data._id}`} className="profileVideo_block" key={index}>
                                        <div className="profileVideo_block_thumbnail">
                                            <img className='profileVideo_block_thumbnail_img' src={data?.thumbnail} alt="thumbnail-img" />
                                        </div>

                                        <div className="profileVideo_block_detail">
                                            <div className="profileVideo_block_detail_name">{data?.title}</div>
                                            <div className="profileVideo_block_detail_about">Created at {data?.createdAt.slice(0,10)}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
