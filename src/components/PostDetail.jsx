import moment from 'moment';
import React, { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Delete, HeartGiven, LeftArrow, Logo, Share } from '../assets/index.js';
import { DeletePost, FetchSelectedPost, LikePost } from "../redux/actions/communityActions.js"
import Avatar from './Avatar.jsx';
import Button from './Button.jsx';

const PostDetail = () => {

    const { postID } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(FetchSelectedPost(postID));
    }, [dispatch])

    const { title, caption, userPosted, media, likes, comments, createdAt, _id } = useSelector((state) => (state.communityReducer?.postData))
    // console.log(selectedPost)

    const currUser = useSelector((state) => (state?.currentUserReducer?.result));
    // console.log(currUser)

    const Users = useSelector((state) => (state?.userReducer));
    // console.log(Users)

    const handleDeletePost = (postID) => {
        dispatch(DeletePost(postID, navigate));
    }

    const handleLikePost = () => {
        dispatch(LikePost(postID, "like", currUser?._id));
    }

    //share functinality
    const location = useLocation()
    const url = "http://localhost:5173" + location.pathname;
    const handleSharePost = () => {
        alert("copied page url : " + url)
    }
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex flex-col md:flex-row justify-center items-end sm:items-center bg-purple-200 p-5'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <Link to="/community">
                        <img src={Logo} alt="Logo" />
                        <h1 className='text-[35px] font-bold mx-2'>Community</h1>
                    </Link>
                </div >
            </div >
            <div className='w-full bg-[#fdf7e2] p-5 border-b-2'>
                <div className='flex justify-between items-center'>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <div className='w-full flex justify-between items-center'>
                            <Link to={`/community/${_id}`}>
                                <h1 className='text-[20px] text-blue-400 font-semibold hover:border-b-2 border-blue-400'>{title}</h1>
                            </Link>
                            <div>
                                <Link to="/community">
                                    <img 
                                        src={LeftArrow}
                                        alt="DeletePost"
                                        className='w-[20px] cursor-pointer transition-all duration-200 hover:scale-110 place-content-start' />
                                </Link>
                            </div>
                        </div>
                        {media ?
                            (<p>{caption}</p>) :
                            (<div className='w-full flex justify-center items-center'>
                                <p className='w-full text-center bg-white p-5 my-2 shadow-md'>{caption}</p>
                            </div>)}
                    </div>
                </div>
                {media && <div className='shadow-md  max-h-[400px] bg-white flex justify-center items-center'>
                    {!media?.includes("mp4") ? (
                        <img
                            src={`http://localhost:5000/media/${media}`}
                            alt="post media"
                            controls
                            autoPlay
                            className='object-contain w-[90vw] max-h-[400px]  ' />
                    ) :
                        (<video
                            src={`http://localhost:5000/media/${media}`}
                            alt="post media"
                            controls
                            className='object-contain w-[90vw] max-h-[400px]  ' />
                        )}
                </div>}
                <div className='w-full flex flex-col md:flex-row justify-between items-center py-5'>
                    <span className='w-full flex justify-between items-center'>
                        <div className='flex justify-center items-center'>
                            <p className='text-[20px] p-2'>{likes?.length}</p>
                            <img
                                onClick={handleLikePost}
                                src={HeartGiven}
                                className="w-[20px] cursor-pointer transition-all duration-200 hover:scale-110" />
                        </div>
                        <div>
                            <CopyToClipboard text={url}>
                                <img
                                    onClick={handleSharePost}
                                    src={Share}
                                    className="w-[20px] cursor-pointer transition-all duration-200 hover:scale-110" />
                            </CopyToClipboard>
                        </div>
                        {userPosted && currUser?.name === userPosted &&
                            <div>
                                <img
                                    onClick={() => (handleDeletePost(_id))}
                                    src={Delete}
                                    alt="DeletePost"
                                    className='w-[20px] cursor-pointer transition-all duration-200 hover:scale-110' />
                            </div>
                        }
                    </span>
                    <span className='w-full flex justify-start md:justify-end items-center'>
                        {Users?.filter((user) => (user?.name === userPosted)).map((user, index) => (
                            <Link
                                key={index}
                                to={`/users/${user?._id}`}
                                className='flex justify-center items-center mr-2'>
                                <Avatar
                                    name={userPosted?.charAt(0).toUpperCase()}
                                    classnames='rounded-[50%] bg-purple-600 text-white text-[20px]  py-2 px-4 mr-2' />
                                <div className='flex flex-col justify-center items-start'>
                                    <span className='font-semibold'>Posted By : {userPosted?.toUpperCase()}</span>
                                    <span className='font-semibold'>Posted : {moment(createdAt).fromNow()}</span>
                                </div>
                            </Link>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PostDetail
