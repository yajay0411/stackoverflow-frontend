import React, { useState } from 'react';
import { Login } from '../../assets';
import { RightSideBar, Button } from '../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { GetUserData } from '../../redux/actions/userActions';
import { getCurrentUser } from '../../redux/actions/currentUserActions';

import { AskQuestion } from "../../redux/actions/questionsActions.js";
import { useEffect } from 'react';

const AskQuestions = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTags, setQuestionTags] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(GetUserData())
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [dispatch])
    const User = useSelector((state) => (state.currentUserReducer?.result));
    // console.log(User)

    const Users = useSelector((state) => (state.userReducer));
    // console.log(Users)

    const userDetail = Users?.filter((user) => (user?._id === User?._id))[0];
    // console.log(userDetail)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(AskQuestion({ questionTitle, questionBody, questionTags, userPosted: userDetail?.name, id: userDetail?._id }, navigate))
    }

    return (
        <>
            {
                !userDetail ?
                    (<div className='w-full flex flex-col justify-between items-center p-5 m-3 ' >
                        <img
                            src={Login} alt="go to login page"
                            className=' w-[60%] mb-5' />
                        <Link to="/auth">
                            <Button
                                name="Go to login page"
                                classnames="px-3 py-2  border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110"
                            />
                        </Link>
                    </div>) :
                    (<>
                        {userDetail?.verified === false ?
                            (<div className='w-full flex flex-col justify-between items-center p-5 m-3 ' >
                                <img
                                    src={Login} alt="go to login page"
                                    className=' w-[60%] mb-5' />
                                <Link to="/authenticateuser">
                                    <Button
                                        name="Verify Email"
                                        classnames="px-3 py-2  border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110"
                                    />
                                </Link>
                            </div>) :
                            (<div className='w-full flex justify-center items-start' >
                                <div className='w-full'>
                                    <h1 className='text-[25px] font-semibold m-5'>Ask a Public Question</h1>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='bg-white p-5 text-[16px]'>
                                        <div className='my-2'>
                                            <h3 className='font-bold py-1'>Title</h3>
                                            <h4 className='py-1'>Be specific and imagine you're asking a question to another person</h4>
                                            <input
                                                type="text"
                                                placeholder='eg.is css bootstrap css than tailwind css ?'
                                                onChange={(e) => { setQuestionTitle(e.target.value) }}
                                                className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full'
                                            />
                                        </div>
                                        <div className='my-2'>
                                            <h3 className='font-bold py-1'>Body</h3>
                                            <h4 className='py-1'>Include all the information someone would need to answer your question</h4>
                                            <textarea
                                                placeholder='eg.is css bootstrap css than tailwind css ?'
                                                className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full'
                                                onChange={(e) => { setQuestionBody(e.target.value) }}
                                                rows="8" />
                                        </div>
                                        <div className='my-2'>
                                            <h3 className='font-bold py-1'>Tags</h3>
                                            <h4 className='py-1'>Add up to 5 Tags to describe what your question is about.</h4>
                                            <input
                                                type="text"
                                                placeholder='eg.is css bootstrap css than tailwind css ?'
                                                className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full'
                                                onChange={(e) => { setQuestionTags(e.target.value.split(" ")) }} />
                                        </div>
                                        <div className='my-2'>
                                            <Button
                                                type="submit"
                                                name="Review Your Question"
                                                classnames="bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold px-3 py-2 w-full sm:w-[200px] text-center cursor-pointer" />
                                        </div>

                                    </form>
                                </div>
                                <RightSideBar />
                            </div >)}
                    </>)
            }
        </>
    )
}

export default AskQuestions
