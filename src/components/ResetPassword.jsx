import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ResetPass, SendOtpEmail } from '../redux/actions/authActions'
import Button from './Button'

const ResetPassword = () => {
    const [email, setemail] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [otpCode, setotpCode] = useState("");
    const [checkotp, setcheckotp] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const togglecheckotp = () => {
        setcheckotp(true);
    }

    const handleSendOTP = (e) => {
        e.preventDefault();
        togglecheckotp();
        dispatch(SendOtpEmail({ email, value: "Reset Password" }));
    }

    const handleResetpassword = (e) => {
        e.preventDefault();
        dispatch(ResetPass({ email, newPassword, otpCode }, navigate));
    }

    return (
        <div className='w-full h-[90vh] flex justify-center items-center' >
            {
                checkotp ?
                    (
                        <form
                            onSubmit={handleResetpassword}
                            className='max-w-[300px] bg-violet-200 flex flex-col justify-center items-center p-5 m-2 rounded-md shadow-md shadow-purple-500 '>
                            <h1 className='w-full text-[30px] text-purple-500 font-bold border-b-2 border-purple-500 my-3 text-center '>Reset Password</h1>
                            <input
                                type="text"
                                name="email"
                                placeholder='enter email'
                                disabled
                                className='w-full p-2 border-none focus:shadow-md focus:outline-none focus:shadow-purple-500 my-3' />
                            <input
                                type="text"
                                name="newPassword"
                                onChange={(e) => (setnewPassword(e.target.value))}
                                placeholder='enter new password'
                                className='w-full p-2 border-none focus:shadow-md focus:outline-none focus:shadow-purple-500 my-3' />
                            <input
                                type="text"
                                name="otpCode"
                                onChange={(e) => (setotpCode(e.target.value))}
                                placeholder='enter OTP'
                                autoComplete="false"
                                className='w-full p-2 border-none focus:shadow-md focus:outline-none focus:shadow-purple-500 my-3' />
                            <div className='w-full flex justify-between items-center'>
                                <Button
                                    name="Set"
                                    type="submit"
                                    classnames="w-[50%] px-3 py-2 my-2 border-2 border-green-600 text-[14px] text-green-600 rounded-md bg-white hover:bg-green-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-[103%] mr-1" />
                                <Button
                                    name="Close"
                                    onClick={() => (setcheckotp(false))}
                                    classnames="w-[50%] px-3 py-2 my-2 border-2 border-red-600 text-[14px] text-red-600 rounded-md bg-white hover:bg-red-600 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-[103%] ml-1" />
                            </div>
                        </form>
                    ) :

                    (
                        <form
                            onSubmit={handleSendOTP}
                            className='max-w-[300px] bg-violet-200 flex flex-col justify-center items-center p-5 m-2 rounded-md shadow-md shadow-purple-500 '>
                            <h1 className='w-full text-[30px] text-purple-500 font-bold border-b-2 border-purple-500 my-3 text-center '>Reset Password</h1>
                            <input
                                type="text"
                                name="email"
                                onChange={(e) => (setemail(e.target.value))}
                                placeholder='enter your email'
                                className='w-full p-2 border-none focus:shadow-md focus:outline-none focus:shadow-purple-500 my-3' />
                            <div className='w-full flex justify-between items-center'>
                                <Button
                                    name="Get OTP"
                                    type="submit"
                                    classnames="w-[50%] px-3 py-2 my-2 border-2 border-green-600 text-[14px] text-green-600 rounded-md bg-white hover:bg-green-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-[103%] mr-1" />
                                <Link to="/auth" className='w-[50%]'>
                                    <Button
                                        name="Close"
                                        classnames="w-full px-3 py-2 my-2 border-2 border-red-600 text-[14px] text-red-600 rounded-md bg-white hover:bg-red-600 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-[103%] ml-1" />
                                </Link>
                            </div>
                        </form>
                    )
            }
        </div>
    )
}

export default ResetPassword
