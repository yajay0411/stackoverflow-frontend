import React from 'react';
import { Link } from "react-router-dom";
import { Logo } from '../assets';
import { Avatar, Button } from "./index"

const Community = () => {
    const AllPosts = 1;

    return (
        <div className='flex flex-col justify-start items-start m-5' >
            <div className='w-full flex flex-col justify-between items-center'>
                <div
                    className='w-full flex flex-col md:flex-row justify-center items-end sm:items-center '>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <img src={Logo} alt="Logo" />
                        <h1 className='text-[35px] font-bold mx-2'>Community</h1>
                    </div>
                    <div className='w-full flex sm:flex-col justify-between items-center'>
                        <p className='font-semibold'>Followers :<span className='font-normal'> 5000</span></p>
                        <Button
                            name="Follow us"
                            classnames="px-3 py-2 my-2 border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110" />
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-row justify-between items-center sm:items-center'>
                <h3 className='text-[30px] font-bold'> All Posts ...</h3>
                <Link to="/createPost">
                    <Button
                        name="Create Post"
                        classnames="px-3 py-2 my-2 border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110" />
                </Link>

            </div>
            <div className='w-full'>
                <h1 className='text-[20px] font-semibold'>Post Title</h1>
                <p>Post Description</p>
                <div className='border-2 h-[300px]'>
                    Post Content
                </div>
                <div className='flex justify-between items-center py-5'>
                    <span>5 Heart</span>
                    <span>
                        {/* {Users?.filter((user) => (user?.name === userPosted)).map((user, index) => ( */}
                        <Link
                            key={"index"}
                            to={`/users/${"user?._id"}`}
                            className='flex justify-center items-center mr-2'>
                            <Avatar
                                name={"userPosted?.charAt(0).toUpperCase()"}
                                classnames='rounded-[50%] bg-purple-600 text-white text-[20px]  py-2 px-4 mr-2' />
                            <span className='font-semibold'>{"userPosted?.toUpperCase()"}</span>
                        </Link>
                        {/* ))} */}
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Community
