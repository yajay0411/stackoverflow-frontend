import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UpVote, DownVote } from "../../assets/index";
import { Avatar, Button } from '../../components/index.js';
import { DeleteAnswer, DeleteSelectedQuestion, GetSelectedQuestion, PostAnswer, VoteQuestion } from '../../redux/actions/questionsActions';

import moment from 'moment';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getCurrentUser } from '../../redux/actions/currentUserActions';
import { GetUserData } from '../../redux/actions/userActions';

const QuestionDetail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    //share functinality
    const location = useLocation()
    const url = "http://localhost:5173" + location.pathname;
    const handleShare = () => {
        alert("copied page url")
    }

    const { questionID } = useParams();
    const [Answer, setAnswer] = useState("");


    const SelectedQuestionData = useSelector((state) => (state.questionReducer.QuestionData));
    const { questionTitle, upVote, downVote, noOfAnswers, postedOn, userPosted, questionBody, questionTags, answer } = SelectedQuestionData;
    // console.log(SelectedQuestionData);

    const Users = useSelector((state) => (state.userReducer))
    // console.log(Users)

    const CurrenUser = useSelector((state) => { return state.currentUserReducer })
    // console.log(CurrenUser)

    useEffect(() => {
        dispatch(GetSelectedQuestion(questionID));
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(GetUserData());
    }, [dispatch])


    const SubmitAnswer = async (e) => {
        e.preventDefault();
        dispatch(PostAnswer({ questionID, noOfAnswers: answer.length + 1, answerBody: Answer, userAnswered: CurrenUser.result.name, userID: CurrenUser.result._id }));
    }

    const handleDeleteQuestion = () => {
        dispatch(DeleteSelectedQuestion(questionID, navigate));
    }

    const handleDeleteAnswer = (answerID) => {
        dispatch(DeleteAnswer({ questionID, answerID, noOfAnswers: answer.length - 1 }, navigate));
    }

    const handleUpVote = () => {
        dispatch(VoteQuestion(questionID, "upVote", CurrenUser.result._id))
    }
    const handleDownVote = () => {
        dispatch(VoteQuestion(questionID, "downVote", CurrenUser.result._id))
    }



    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-full flex justify-start items-center px-5 p-5'>
                    {questionTitle && <h1 className='text-[25px] font-semibold'>{questionTitle}</h1>}
                </div>
                <div className='w-full flex flex-col md:flex-row justify-evenly items-start md:items-center border-b-2'>
                    <div className='md:flex flex-col justify-center items-center p-5 order-1 md:order-none hidden'>
                        <img
                            src={UpVote}
                            onClick={handleUpVote}
                            className="w-[15px] transition-all duration-300 hover:scale-125 cursor-pointer"></img>
                        {upVote && downVote && <p className='text-[25px]'>{upVote.length - downVote.length}</p>}
                        <img
                            src={DownVote}
                            onClick={handleDownVote}
                            className="w-[15px] transition-all duration-300 hover:scale-125 cursor-pointer"></img>
                    </div>
                    <div className='px-5'>
                        <div className='flex flex-col justify-center items-start sm:items-start py-1'>
                            <div className='py-1'>
                                <p className='text-gray-500 font-semibold'>{questionBody}</p>
                            </div>
                            <div className='py-1'>
                                {questionTags && questionTags.map((tag, index) => (<p key={index} className="rounded-[5px] bg-[#a7dafca4] text-[#335977] px-2 py-1 mr-1 my-1 inline-block">{tag}</p>))}
                            </div>
                        </div>
                        <div className='flex justify-center items-center md:items-start py-1'>
                            <CopyToClipboard text={url}>
                                <Button
                                    onClick={handleShare}
                                    name="Share"
                                    classnames="px-5 py-2  border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 mr-2 cursor-pointer" />
                            </CopyToClipboard>
                            {CurrenUser && userPosted && CurrenUser.result.name === userPosted &&

                                <Button
                                    onClick={handleDeleteQuestion}
                                    name="Delete"
                                    classnames="px-5 py-2 border-2 border-red-600 text-[14px] text-red-600 rounded-md hover:bg-red-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 ml-2 cursor-pointer" />

                            }
                            <div className='flex flex-col justify-center items-center p-5 order-1 md:order-none md:hidden'>
                                <img
                                    src={UpVote}
                                    onClick={handleUpVote}
                                    className="w-[15px] transition-all duration-300 hover:scale-125 cursor-pointer"></img>
                                {upVote && downVote && <p className='text-[25px]'>{upVote.length - downVote.length}</p>}
                                <img
                                    src={DownVote}
                                    onClick={handleDownVote}
                                    className="w-[15px] transition-all duration-300 hover:scale-125 cursor-pointer"></img>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center p-5 md:p-1 text-[14px]'>
                        <div className='flex justify-center items-center'>
                            <div>
                                {Users?.filter((user) => (user?.name === userPosted)).map((user, index) => (
                                    <Link
                                        key={index}
                                        to={`/users/${user?._id}`}
                                        className='flex justify-center items-center mr-2'>
                                        <Avatar
                                            name={userPosted?.charAt(0).toUpperCase()}
                                            classnames='rounded-[50%] bg-purple-600 text-white text-[20px]  py-2 px-4 mr-2' />
                                        <span className='font-semibold'>{userPosted?.toUpperCase()}</span>
                                    </Link>
                                ))}
                            </div>
                            <div>
                                <p >Asked :<span className='font-semibold'> {moment(postedOn).fromNow()}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full border-b-2'>
                    <p className='text-gray-500 font-semibold px-5 py-1 text-[20px]'>{(noOfAnswers === 0) ? "No" : (noOfAnswers)} Answers</p>

                    {answer && answer.map(({ answerBody, answeredON, userAnswered, _id }, index) => (
                        <div
                            key={index}
                            className='flex flex-col sm:flex-row justify-between items-center border-b-2 px-5 py-1'>
                            <div className=''>
                                <div>
                                    <p>{answerBody}</p>
                                </div>
                                <div className='hidden items-center my-2 sm:flex'>
                                    <CopyToClipboard text={url}>
                                        <Button
                                            onClick={handleShare}
                                            name="Share"
                                            classnames="px-5 py-2  border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 mr-2 cursor-pointer" />
                                    </CopyToClipboard>
                                    {CurrenUser && userPosted && CurrenUser.result.name === userAnswered &&
                                        <Button
                                            onClick={() => handleDeleteAnswer(_id)}
                                            name="Delete"
                                            classnames="px-5 py-2  border-2 border-red-600 text-[14px] text-red-600 rounded-md hover:bg-red-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 ml-2 cursor-pointer" />
                                    }
                                </div>
                            </div>
                            <div className='flex items-center my-2 sm:hidden'>
                                <CopyToClipboard text={url}>
                                    <Button
                                        onClick={handleShare}
                                        name="Share"
                                        classnames="px-5 py-2  border-2 border-blue-600 text-[14px] text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 mr-2 cursor-pointer" />
                                </CopyToClipboard>
                                {CurrenUser && userPosted && CurrenUser.result.name === userAnswered &&
                                    <Button
                                        onClick={() => handleDeleteAnswer(_id)}
                                        name="Delete"
                                        classnames="px-5 py-2  border-2 border-red-600 text-[14px] text-red-600 rounded-md hover:bg-red-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 ml-2 cursor-pointer" />
                                }
                            </div>
                            <div className='flex flex-col justify-center items-center basis-1/2 p-1 mr-5'>
                                <div className='self-end'>
                                    <div className='flex justify-center items-center'>
                                        {CurrenUser && userAnswered && <Link to={`/users/${CurrenUser.result._id}`}>
                                            <Avatar
                                                name={userAnswered.charAt(0).toUpperCase()}
                                                classnames='rounded-[50%] bg-purple-600 text-white text-[20px] py-2 px-4 mr-2' />
                                        </Link>}
                                        <p className='text-[14px]'>Answered :<span className='font-semibold text-[14px]'> {moment(answeredON).fromNow()}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full flex flex-col justify-center items-center my-5'>
                    <form
                        onSubmit={SubmitAnswer}
                        className='w-full px-5'>
                        <p className='text-[20px] text-gray-500 font-semibold py-1'>Your Answer</p>
                        <div className='py-1'>
                            <textarea
                                placeholder='Enter Your Answer Here..'
                                className='p-1 my-1 border-2 border-gray-300 rounded-sm w-full' rows="8"
                                onChange={(e) => (setAnswer(e.target.value))} />
                        </div>
                        <div className='flex items-center my-2'>
                            <Button
                                type="submit"
                                name="Post"
                                classnames="bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold px-3 py-2 w-[30%] text-center cursor-pointer transition-all duration-300 hover:scale-105" />
                        </div>
                    </form>
                    <div className='p-5'>
                        <span>
                            Browse other Questions tagged with <span>
                                {questionTags && questionTags.map((tag, index) => (<span key={index} className="rounded-[5px] bg-[#a7dafca4] text-[#335977] mr-2 px-2 py-1 inline-block ">{tag}</span>))}
                            </span>
                            or   <Link to="/askquestion"
                                className='inline-block hover:border-b-2 hover:border-blue-300'>
                                <span className='text-blue-600'>Ask your own question.</span>
                            </Link>
                        </span>
                    </div>
                </div >
            </div>
        </>

    )
}

export default QuestionDetail
