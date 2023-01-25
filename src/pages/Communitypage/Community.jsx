import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Delete, HeartGiven, Logo, Share } from '../../assets';
import { DeletePost, FetchAllPosts, LikePost } from '../../redux/actions/communityActions';
import { Avatar, Button, CreatePost } from "../../components/index";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getCurrentUser } from '../../redux/actions/currentUserActions';

const Community = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(FetchAllPosts(dispatch));
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [dispatch]);

    const allPostData = useSelector((state) => (state?.communityReducer.data));
    // console.log(allPostData)

    const currUser = useSelector((state) => (state?.currentUserReducer?.result));
    // console.log(currUser)

    const Users = useSelector((state) => (state?.userReducer));
    // console.log(Users)

    const handleLikePost = (postID) => {
        dispatch(LikePost(postID, "like", currUser?._id));
    }

    //share functinality
    const location = useLocation()
    const url = "http://localhost:5173" + location.pathname;
    const handleSharePost = () => {
        alert("copied page url : " + url)
    }

    return (
        <>
            <div className='w-full flex flex-col justify-center items-center' >
                <div className='w-full flex flex-col justify-center items-center'>
                    <div
                        className='w-full flex flex-col md:flex-row justify-center items-end sm:items-center bg-purple-200 p-5'>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <img src={Logo} alt="Logo" />
                            <h1 className='text-[35px] font-bold mx-2'>Community</h1>
                        </div >
                    </div >
                </div >
                {!currUser ?
                    (
                        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-5'>
                            <h1 className='text-[30px] text-red-500 font-bold'>Login to post</h1>
                            <Link to="/auth">
                                <Button
                                    name="Go to Login Page"
                                    classnames="px-3 py-2 my-2 border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110" />
                            </Link>
                        </div>
                    ) :
                    (
                        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-5'>
                            <h3 className='text-[30px] font-bold'> All Posts ...</h3>
                            <Link to="/community/createpost">
                                <Button
                                    name="Create Post"
                                    classnames="px-3 py-2 my-2 border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110" />
                            </Link>
                        </div>
                    )
                }
                {allPostData?.map(({ title, caption, _id, media, likes, userPosted, createdAt }) =>
                (
                    <div
                        key={_id}
                        className='w-full bg-[#fdf7e2] p-5 border-b-2'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <Link to={`/community/${_id}`}>
                                    <h1 className='text-[20px] text-blue-400 font-semibold hover:border-b-2 border-blue-400'>{title}</h1>
                                </Link>
                                {media ?
                                    (<p>{caption}</p>) :
                                    (<div className='w-full flex justify-center items-center'>
                                        <p className='w-full text-center bg-white p-5 my-2 shadow-md'>{caption}</p>
                                    </div>)}
                            </div>
                        </div>
                        {media && <div className='shadow-md  max-h-[400px] bg-white flex justify-center items-center'>
                            <Link to={`/community/${_id}`}>
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
                            </Link>
                        </div>}
                        <div className='w-full flex flex-col md:flex-row justify-between items-center py-5'>
                            <span className='w-full flex justify-start items-center'>
                                <div className='flex justify-center items-center'>
                                    <p className='text-[20px] p-2'>{likes.length}</p>
                                    <img
                                        onClick={() => (handleLikePost(_id))}
                                        src={HeartGiven}
                                        className="w-[20px] cursor-pointer transition-all duration-200 hover:scale-110 m-2" />
                                </div>
                                <div>
                                    <CopyToClipboard text={url}>
                                        <img
                                            onClick={handleSharePost}
                                            src={Share}
                                            className="w-[20px] cursor-pointer transition-all duration-200 hover:scale-110 m-2" />
                                    </CopyToClipboard>
                                </div>

                            </span>
                            <span className='w-full flex justify-start md:justify-end items-center'>
                                {Users?.filter((user) => (user?.name === userPosted)).map((user, index) => (
                                    <Link
                                        key={"index"}
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
                ))}
            </div>

        </>
    )
}

export default Community
