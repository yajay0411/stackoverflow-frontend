import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './index.js';

//import action 
import { SharePost } from '../redux/actions/communityActions.js';


const CreatePost = () => {

    const currUser = useSelector((state) => (state?.currentUserReducer?.result));
    // console.log(currUser)

    const [title, setpostTitle] = useState("");
    const [caption, setpostCaption] = useState("");
    const [media, setpostMedia] = useState("");
    const [userPosted, setUserPosted] = useState(currUser?.name);

    //sending post data as form data since contains media file
    const postData = new FormData()
    postData.append("title", title);
    postData.append("caption", caption);
    postData.append("media", media);
    postData.append("userPosted", userPosted);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSharePost = (e) => {
        e.preventDefault();
        dispatch(SharePost(postData, navigate));
    }


    return (
        <div className='w-full h-[90vh] flex justify-center items-center' >
            <form
                onSubmit={handleSharePost}
                className='max-w-[300px] bg-violet-200 flex flex-col justify-center items-center p-5 m-2 rounded-md shadow-md shadow-purple-500 '>
                <h1 className='w-full text-[30px] text-purple-500 font-bold border-b-2 border-purple-500 my-5 text-center '>Create Your Post</h1>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => (setpostTitle(e.target.value))}
                    placeholder='write your caption'
                    className='w-full p-2 border-none focus:shadow-md focus:outline-purple-500 focus:shadow-purple-500 my-3' />
                <textarea
                    name="caption"
                    onChange={(e) => (setpostCaption(e.target.value))}
                    placeholder='write your caption'
                    className='w-full p-2 border-none focus:shadow-md focus:outline-purple-500 focus:shadow-purple-500 my-3' />
                <input
                    type="file"
                    name="media"
                    onChange={(e) => (setpostMedia(e.target.files[0]))}
                    className="w-full text-white font-semibold cursor-pointer bg-gray-50 focus:outline-none dark:bg-purple-400 dark:placeholder-gray-400" />
                <p className="mt-1 text-sm text-purple-500">( Image [ png, svg, jpg ]. Video [mp4] )</p>

                <div className='w-full flex justify-between items-center'>
                    <Button
                        name="Share Post"
                        type="submit"
                        classnames="w-[50%] px-3 py-2 my-2 border-2 border-green-600 text-[14px] text-green-600 rounded-md bg-white hover:bg-green-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-[103%] mr-1" />
                    <Link to="/community" className='w-[50%]'>
                        <Button
                            name="Close"
                            classnames="w-full px-3 py-2 my-2 border-2 border-red-600 text-[14px] text-red-600 rounded-md bg-white hover:bg-red-600 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-[103%] ml-1" />
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;
