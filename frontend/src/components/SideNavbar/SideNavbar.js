import React from 'react'
import "./SideNavbar.css";
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Link } from 'react-router-dom';

const SideNavbar = ({sideNavbar}) => {
    return (
        <div className={sideNavbar?'home-sideNavbar':"homeSideNavbarHide"}>
            <div className="home_sideNavbarTop">
                <Link to={'/'} className={`home_sideNavbarTopOption`}>
                    <HomeIcon />
                    <div className="home_sideNavbarTopOptionTitle">Home</div>
                </Link>

                <div className={`home_sideNavbarTopOption`}>
                    <VideocamIcon />
                    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div>

            </div>

            <div className="home_sideNavbarMiddle">
                <div className={`home_sideNavbarTopOption`}>
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ChevronRightIcon />
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <RecentActorsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <PlaylistPlayIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlists</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <SmartDisplayIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your videos</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <ScheduleIcon />
                    <div className="home_sideNavbarTopOptionTitle">Watch later</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <ThumbUpOffAltIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <ContentCutIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your clips</div>
                </div>
            </div>

            <div className="home_sidebarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">
                        Subscription
                    </div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZspqmXs4JPmdoO_5JCVXXO0CO80YkQnlTJA&s" alt="side-icon" />
                    <div className="home_sideNavbarTopOptionTitle">
                        Aaj Tak
                    </div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNDnyeIEPiAvHkqe9kVc28AYEqSoRns4wPgw&s" alt="side-icon" />
                    <div className="home_sideNavbarTopOptionTitle">
                        The LallanTop
                    </div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src="https://images.indianexpress.com/2023/10/NDTV1.jpg" alt="side-icon" />
                    <div className="home_sideNavbarTopOptionTitle">
                        NDTV India
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar
