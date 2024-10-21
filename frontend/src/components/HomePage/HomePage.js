import React, { useEffect, useState } from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
    const options = ["All", "Twenty20 Cricket", "Music", "Live", "Mixes", "Gaming", "Debates", "Coke Studio Pakistan", "Democracy", "Pakistani dramas", "Comedy", "Pakistani dramas", "Comedy"];
    const [data, setData] = useState([]);

    const getAllVideos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/allvideos')
            console.log(response.data.videos)
            setData(response.data.videos)
        } catch (error) {
            console.log(error.message)
        }
    }

    const duration =localStorage.getItem("videoDuration")
    useEffect(() => {
        getAllVideos()
    }, [])


    return (
        <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
            <div className="homePage_options">
                {
                    options?.map((item, index) => {
                        return (
                            <div className="homePage_option" key={index}>{item}</div>
                        )
                    })
                }
            </div>

            <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
                {
                    data?.map((item, ind) => {
                        return (
                            <Link to={`/watch/${item._id}`} className="youtube_video" key={ind}>

                                <div className="youtube_thumbnailBox">
                                    <img src={item.thumbnail} alt="thumbnail" className="youtube_thumbnailPic" />
                                    <div className="youtube_timingThumbnail">{duration}</div>
                                </div>

                                <div className="youtubeTitleBox">
                                    <div className="youtubeTitleBoxProfile">
                                        <img src={item.user.profilePic }alt="dummy-image" className='youtube_thumbnail_profile' />
                                    </div>

                                    <div className="youtubeTitleBox_Title">
                                        <div className="youtube_videoTitle">{item.title}</div>
                                        <div className="youtube_channelName">{item.user.userName}</div>
                                        <div className="youtubeVideo_views">{item.like} Likes</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default HomePage
