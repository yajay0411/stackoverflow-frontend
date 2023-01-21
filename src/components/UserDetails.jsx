import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button } from './index';
import moment from 'moment';
import { FollowUser, GetUserData, UpdateUserData } from '../redux/actions/userActions';
import { getCurrentUser } from '../redux/actions/currentUserActions';


const UserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const User = useSelector((state) => (state.currentUserReducer));
    // console.log(User);

    const Users = useSelector((state) => (state.userReducer));
    // console.log(Users);


    useEffect(() => {
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(GetUserData());
    }, [dispatch])


    const userDetail = Users && Users.filter((user) => (user._id === userId))[0];
    // console.log(userDetail);

    const handleLogOut = () => {
        localStorage.removeItem("Profile");
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");
    }


    const [editProfile, setEditProfile] = useState(false);
    const [name, setName] = useState(userDetail?.name)
    const [about, setAbout] = useState(userDetail?.about)
    const [tags, setTags] = useState("")
    // let formRef = useRef(null);

    const handleEditProfiletoggle = () => {
        // formRef.current.scrollIntoView({ behavior: 'smooth'});
        setEditProfile((prev) => (!prev))
    }

    const handleEditProfilesubmit = (e) => {
        e.preventDefault();
        if (tags.length === 0) {
            dispatch(UpdateUserData(userId, { name, about }))
        } else {
            dispatch(UpdateUserData(userId, { name, about, tags }))
        }
        setEditProfile((prev) => (!prev));

    }

    const handlefollow = () => {
        dispatch(FollowUser({ _id: userId, value: "follow", userId: User?.result?._id, updateData: { name, about, tags } }))
    }


    return (

        <div className='w-full flex flex-col-reverse md:flex-row p-1 sm:p-5' >
            <div className='w-full'>
                {User && userDetail && User?.result?._id == userDetail?._id && <div className='flex justify-center items-center'>
                    {!editProfile && <Button
                        onClick={handleEditProfiletoggle}
                        name="Edit Profile"
                        classnames="w-full flex justify-center px-5 py-1 mx-2 border-2 border-black text-[14px]  text-black rounded-md hover:bg-black hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-105 flex" />}
                    <Button
                        onClick={handleLogOut}
                        name="Log Out"
                        classnames="w-full flex justify-center px-5 py-1 mx-2 border-2 border-red-500 text-[14px] text-red-500 rounded-md hover:bg-red-500 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-105 flex" />
                </div>}
                {userDetail &&
                    <div
                        className='flex flex-col justify-center items-center shadow-lg my-2 mx-auto border-2 '
                        key={userDetail?._id}>
                        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b-2 overflow-hidden'>
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='w-full flex flex-row sm:flex-col justify-between items-center sm:justify-start sm:items-start mb-5'>
                                    <div>
                                        <Avatar
                                            name={userDetail?.name.charAt(0).toUpperCase()}
                                            classnames='rounded-[10px] bg-orange-500 font-semibold text-white text-[40px]  py-1 sm:py-3 px-5 sm:px-8 my-2' />
                                    </div>
                                    {userId !== User?.result?._id && <div>
                                        {
                                            userDetail?.followers?.includes(User?.result?._id) ?
                                                (<>
                                                    <div className='flex flex-col justify-center items-start'>
                                                        <p className='text-[15px] text-gray-400 mr-2 my-1'>Following    {userDetail?.name.toLowerCase()}</p>
                                                        <Button
                                                            onClick={handlefollow}
                                                            name="Unfollow"
                                                            classnames="flex justify-center px-5 py-1
                                                    border-2 border-red-500 text-[14px] text-red-500 rounded-md font-semibold transition-all ease-in-out duration-300 hover:scale-105 flex" />
                                                    </div>
                                                </>

                                                ) :
                                                (
                                                    <Button
                                                        onClick={handlefollow}
                                                        name="follow"
                                                        classnames="w-full flex justify-center px-6 py-1 border-2 border-blue-500 text-[14px] rounded-md bg-blue-500 text-white font-semibold transition-all ease-in-out duration-300 hover:scale-105 flex" />
                                                )
                                        }
                                    </div>}
                                </div>
                            </div>
                            <div className='w-full flex flex-col justify-start items-start'>
                                <div className='w-full flex flex-row justify-between items-start py-1  text-[14px] '>
                                    <p className='w-[30%] font-semibold mr-1'>Name :</p><span className="w-[70%]">{userDetail?.name.toUpperCase()}</span>
                                </div>
                                <div className='w-full flex flex-row justify-between items-start py-1 text-[14px] ' >
                                    <p className='w-[30%] font-semibold mr-1'>Id :</p><span className="w-[70%]">{userDetail?._id}</span>
                                </div>
                                <div className='w-full flex flex-row justify-between items-start  py-1  text-[14px] '>
                                    <p className='w-[30%] font-semibold mr-1'>E-mail :</p><span className="w-[70%]">{userDetail?.email}</span>
                                </div>
                                <div className='w-full flex flex-row justify-between items-start  py-1 F text-[14px] '>
                                    <p className='w-[30%] font-semibold mr-1'>Joined On :</p><span className="w-[70%]">{moment(userDetail?.joinedOn).format("Do MMMM  YYYY")}</span>
                                </div>
                                <div className='w-full flex flex-row justify-between items-start  py-1 F text-[14px] '>
                                    <p className='w-[30%] font-semibold mr-1'>Followers :</p><span className="w-[70%]">{userDetail?.followers.length}</span>
                                </div>
                                <div className='w-full flex flex-row justify-between items-start  py-1 F text-[14px] '>
                                    <p className='w-[30%] font-semibold mr-1'>Following :</p><span className="w-[70%]">{userDetail?.following.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center m-5'>
                            <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center py-1 px-5  text-[14px] ' >
                                <div className='w-full'>
                                    <p className='font-semibold'>Tags watched :</p>
                                </div>
                                <div className='w-full flex flex-col sm:flex-row '>
                                    {
                                        userDetail?.tags.map((tag, index) =>
                                        (
                                            <span
                                                key={index}
                                                className="w-[100px] rounded-md bg-[#8ed6f3] text-[#034058] px-2 py-2 my-2 sm:mr-2 text-center">{tag}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center py-1 px-5  text-[14px] ' >
                                <div className='w-full'>
                                    <p className='font-semibold mr-2 '>About :</p>
                                </div>
                                <div className='w-full flex flex-col sm:flex-row '>
                                    <span>{userDetail.about}</span>
                                </div>
                            </div>
                            <div className='w-full flex flex-col sm:flex-row justify-between items-start py-1 px-5  text-[14px] ' >

                            </div>
                        </div>
                    </div>
                }
            </div>
            {editProfile &&
                <div
                    className='w-full flex flex-col justify-center items-center shadow-lg my-10 mx-auto border-2'>
                    <div className="w-full p-5 flex flex-col justify-center items-center">
                        <div>
                            <h1 className='text-[20px] font-semibold'>Edit your Profile </h1>
                        </div>
                        <div>
                            <h1 className='text-[20px]'>Public Information </h1>
                        </div>
                        <form
                            onSubmit={handleEditProfilesubmit}
                            className="w-full">
                            <div>
                                <label htmlFor='name'>
                                    <h3 className='font-bold py-1'>Display Name :</h3>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder='eg.AJAY YADAV'
                                        onChange={(e) => { setName(e.target.value) }}
                                        className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full focus:outline-blue-300 focus:shadow-sm focus:shadow-blue-300 '
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor='about'>
                                    <h3 className='font-bold py-1'>About me :</h3>
                                    <textarea
                                        id="about"
                                        placeholder='eg.AJAY YADAV'
                                        onChange={(e) => { setAbout(e.target.value) }}
                                        className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full focus:outline-blue-300 focus:shadow-sm focus:shadow-blue-300'
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor='tags'>
                                    <h3 className='font-bold py-1'>Watched tags :</h3>
                                    <input
                                        type="text"
                                        id="tags"
                                        placeholder='eg.javascript, react'
                                        onChange={(e) => { setTags(e.target.value.split(" ")) }}
                                        className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full focus:outline-blue-300 focus:shadow-sm focus:shadow-blue-300'
                                    />
                                </label>
                            </div>
                            <div className='w-full my-2 flex justify-center items-center'>
                                <Button
                                    type="submit"
                                    name="submit"
                                    classnames="w-full px-3 py-2 my-2 border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-105 mx-2"
                                />
                                <Button
                                    onClick={handleEditProfiletoggle}
                                    name="Close"
                                    classnames="w-full px-3 py-2 my-2 border-2 border-red-600 text-[14px] text-red-600 rounded-md hover:bg-red-600 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-105 mx-2" />
                            </div>

                        </form>
                    </div>
                </div>
            }
        </div >
    )
}
export default UserDetails
