import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Button, RightSideBar } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllQuestions, GetSelectedQuestion } from '../redux/actions/questionsActions';
import { GetUserData } from '../redux/actions/userActions';
import moment from "moment";


const Home = () => {
    const dispatch = useDispatch();


    const GetAllQuestionslist = useSelector((state) => (state.questionReducer));
    const AllQuestions = GetAllQuestionslist.data;
    // console.log(AllQuestions)



    const Users = useSelector((state) => (state.userReducer))
    // console.log(Users)

    useEffect(() => {
        dispatch(GetAllQuestions());
        dispatch(GetUserData());
    }, [dispatch])

    const location = useLocation();


    return (
        <div className='w-full flex justify-start items-start' >
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-2'>
                    {
                        location.pathname === "/" ?
                            (<h3 className='text-[30px] font-bold'> Top Questions ...</h3>) :
                            (<h3 className='text-[30px] font-bold'> All Questions ...</h3>)
                    }
                    <Link to="/askquestion">
                        <Button
                            name="Add Question"
                            classnames="px-3 py-2 my-2 border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110" />
                    </Link>
                </div>
                {AllQuestions === null ?
                    (
                        <div>
                            <h1>LOADING ...</h1>
                        </div>
                    ) :
                    (
                        <div className='m-2 w-full'>
                            <div className='p-2'>
                                <h1 className='text-[18px] font-semibold '>{AllQuestions.length} Questions</h1>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center p-2'>
                                {AllQuestions && AllQuestions.map(({ _id, upVote, downVote, noOfAnswers, postedOn, questionTitle, questionTags, userPosted
                                }, index) => (
                                    <div
                                        key={_id}
                                        className='w-full bg-[#fdf7e2] flex flex-col md:flex-row justify-between items-start md:items-center p-2 border-b-2 border-[#f1e5bc]'>
                                        <div className='flex sm:flex-col lg:flex-row justify-between  sm:justify-evenly sm:items-center w-[150px] my-5'>
                                            <div className='text-center'>
                                                <p className='font-semibold'>{upVote.length - downVote.length}</p>
                                                <p>Votes</p>
                                            </div>
                                            <div className='text-center'>
                                                <p className='font-semibold'>{noOfAnswers}</p>
                                                <p>Anwsers</p>
                                            </div>
                                        </div>
                                        <div className='text-left md:w-[300px] order-[-1]'>
                                            <Link to={`/questions/${_id}`}><p className='text-blue-500 text-[18px] font-semibold'>{questionTitle}</p></Link>
                                            {questionTags && questionTags.map((tag, index) => (<p key={index} className="rounded-[10px] bg-[#8ed6f3] text-[#034058] px-2 py-2 mr-2 my-2 inline-block">{tag}</p>))}
                                        </div>
                                        <div className='flex flex-col justify-center items-center sm:p-1 mr-5'>
                                            <div>
                                                <p >Posted On : <span className='font-semibold'>{moment(postedOn).fromNow()}</span></p>
                                                <div className='flex my-1'>


                                                    {Users && Users.filter((users) => (users.name === userPosted)).map((user, index) => (
                                                        <Link
                                                            key={index}
                                                            to={`/users/${user._id}`}
                                                            className='flex justify-center items-center'>
                                                            <Avatar
                                                                name={userPosted.charAt(0).toUpperCase()}
                                                                classnames='rounded-[50%] bg-purple-600 text-white text-[20px]  py-2 px-4 mr-2' />
                                                            <span className='font-semibold'>{userPosted.toUpperCase()}</span>
                                                        </Link>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}
            </div>
            <RightSideBar />
        </div>
    )
}

export default Home
