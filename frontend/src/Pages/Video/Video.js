import React, { useState, useEffect } from 'react'
import "./Video.css"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Video = () => {
    const [comment, setComment] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("")
    const [comments, setComments] = useState([])
    const { id } = useParams()

    //console.log(comment)
    const fetchVideoById = async () => {
        try {
            const { data } = await axios.get(`https://utube-cvn8.onrender.com/api/getvideobyid/${id}`);
            console.log(data.video)
            setData(data.video)
            setVideoUrl(data.video.videoLink)
        } catch (error) {
            console.log(error)
        }
    }

    const getCommentByVideoId = async () => {
        try {
            const { data } = await axios.get(`https://utube-cvn8.onrender.com/commentapi/comment/${id}`)
            console.log(data.comments)
            setComments(data.comments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId()
    }, [])

    const handleComment = async () => {
        const body = {
            "message": comment,
            "video": id
        }
        try {
            const resp = await axios.post("https://utube-cvn8.onrender.com/commentapi/addcomment", body, { withCredentials: true });
            setComment("")
            const newComment = resp.data.comment;
            setComments([...comments, newComment])
        } catch (error) {
            console.log(error)
            toast.error("Login to add a comment", {
                position: "bottom-center"
            })
        }
    }

    const handleLikes = async () => {
        try {
            const {data} = await axios.put(`https://utube-cvn8.onrender.com/api/${id}/like`, {}, { withCredentials: true });
            const updatedPost =data.updatedPost.like;
             setData(prevData=>({
                ...prevData,
                like:updatedPost
             }))
            console.log(data.updatedPost)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnLikes = async () => {
        try {
            const {data }=await axios.put(`https://utube-cvn8.onrender.com/api/${id}/dislike`, {}, { withCredentials: true });
            const updatedPost =data.updatedPost.dislike;
            setData(prevData=>({
               ...prevData,
               dislike:updatedPost
            }))
           console.log(data.updatedPost)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {
                        data && <video width="400" controls autoPlay className='video_youtube_video' >
                            <source src={videoUrl} type='video/mp4' />
                            <source src={videoUrl} type='video/webm' />
                            Your browser does not support the video tag.
                        </video>
                    }
                </div>

                {data &&<div className="video_youtubeAbout">

                     <div className="video_uTubeTitle">{data?.title}</div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_profileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} alt="video-img" />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>

                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpOffAltIcon onClick={handleLikes} />
                                <div className="youtube_video_likeBlock_NoOfLikes">{data?.like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>

                            <div className="youtube_video_likeBlock_Like">
                                <ThumbDownOffAltIcon onClick={handleUnLikes} />
                                <div className="youtube_video_likeBlock_NoOfLikes">{data?.dislike}</div>
                            </div>
                        </div>
                    </div>

                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>

                </div>}

                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
                    <div className="youtubeSelfComment">
                        <img className='video_youtubeSelfCommentProfile' src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" alt="comment-photo" />
                        <div className="addAComment">
                            <input type="text" className='addACommentInput' name='comment' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>

                    {
                        comments?.map((comment, index) => {
                            return (
                                <div className="youtubeOthersComments" key={index}>
                                    <div className="youtubeSelfComment">
                                        <img className='video_youtubeSelfCommentProfile' src={comment?.user?.profilePic} alt="comment-photo" />
                                        <div className="others_commentSection">
                                            <div className="others_commentSectionHeader">
                                                <div className="channelName_comment">{comment?.user?.userNamne}</div>
                                                <div className="commentTimingOthers">{comment?.createdAt.slice(0, 10)}</div>
                                            </div>
                                            <div className="otherCommentSectionComment">
                                                {comment?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }

                </div>
            </div>

            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img className='video_suggestion_thumbnail_img' src="https://www.herzing.edu/sites/default/files/2021-02/data-analyst.jpg" alt="thumbnail" />
                    </div>

                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">T20 2024 Worldcup final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggestions_About_Profile">Cricket 320</div>
                        <div className="video_suggestions_About_Profile">136k views . 1 day</div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Video
