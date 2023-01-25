import React from 'react';
import { useState } from 'react';
import { Favicon } from '../../assets';
import Button from '../../components/Button';
import { signup, login } from '../../redux/actions/authActions.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';



const Auth = () => {
    const [isLogIn, setIsLogIn] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSwitch = () => {
        setIsLogIn((prev) => !prev)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogIn) {
            dispatch(login({ email, password }, navigate));
        }
        else {
            dispatch(signup({ name, email, password }, navigate));
        }

    }

    return (
        <div className='w-full flex flex-col justify-center items-center p-5 bg-gray-200'>
            {
                isLogIn ?
                    (<>
                        <img src={Favicon} alt="stackoverflowlogo" className='w-[50] sm:w-[100px]' />
                        <form
                            onSubmit={handleSubmit}
                            className='w-[300px] bg-white shadow-md rounded-[5px] p-5 m-5 flex flex-col items-center justify-center'>
                            <div className="flex flex-col w-full">
                                <label
                                    htmlFor="email"
                                    className='py-1 font-medium '
                                >E-mail</label>
                                <input
                                    type="text"
                                    placeholder="abcd@xyz.com"
                                    id="email"
                                    name="email"
                                    required
                                    className='border-2 outline-none py-1 px-2 rounded-sm'
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor="password"
                                        className='py-1 font-medium '
                                    >Password</label>
                                    <Link to="/resetpassword">
                                        <span className='text-[14px] text-blue-400'>forgot password ?</span>
                                    </Link>
                                </div>
                                <input
                                    type="text"
                                    placeholder="password"
                                    id="password"
                                    name="password"
                                    required
                                    className='border-2 outline-none py-1 px-2 rounded-sm'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                name="Login"
                                classnames="w-[100%] text-center mt-2 px-3 py-2 text-[14px] rounded-md bg-blue-500 text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-105 cursor-pointer"
                            />
                        </form>
                    </>) :
                    (<>
                        <div className='w-full flex flex-col md:flex-row justify-center items-center'>
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='w-full flex justify-center items-center py-3'>
                                    <img src={Favicon} alt="stackoverflowlogo" className='w-[120px]' />
                                </div>
                                <div className='w-full flex flex-col justify-center items-center'>
                                    <h1 className='sm:w-[40vw] text-[30px] font-semibold py-3'>Join the Stack Overflow community</h1>
                                    <p className='sm:w-[40vw] text-[20px] text-gray-500 py-2'>Get unstuck -ask a question Unlock new privileges like voting and Save your favorite tags, filters, and jobs Earn reputation and badges</p>
                                    <p className='sm:w-[40vw] text-[15px] text-black py-2'>Collaborate and share knowlegde with a private group for <span className='font-semibold'> Get Stack Overflow for teams for upto 50 users.</span></p>
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <form
                                    onSubmit={handleSubmit}
                                    className='max-w-[350px] bg-white shadow-md rounded-[5px] p-5 flex flex-col items-center justify-center'>

                                    <div className=" w-full flex flex-col">
                                        <label
                                            htmlFor="username"
                                            className='py-1 font-medium'
                                        >Username</label>
                                        <input
                                            type="text"
                                            placeholder="example: yajay_04112000"
                                            id="username"
                                            name="username"
                                            // required
                                            className='border-2 outline-none py-1 px-2 rounded-sm'
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                    </div>
                                    <div className=" w-[100%] flex flex-col">
                                        <label
                                            htmlFor="email"
                                            className='py-1 font-medium'
                                        >E-mail</label>
                                        <input
                                            type="email"
                                            placeholder="example: yajay_04112000"
                                            id="email"
                                            name="email"
                                            // required
                                            className='border-2 outline-none py-1 px-2 rounded-sm'
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>
                                    <div className=" w-[100%] flex flex-col">
                                        <label
                                            htmlFor="password"
                                            className='py-1 font-medium'
                                        >Password</label>
                                        <input
                                            type="text"
                                            placeholder="password"
                                            id="password"
                                            name="password"
                                            // required
                                            className='border-2 outline-none py-1 px-2 rounded-sm'
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </div>


                                    <p className='w-100% text-[12px] py-2'>Passwords must contain at least eight
                                        characters,including at least 1 letter and
                                        1 number.</p>
                                    <label
                                        htmlFor='term'
                                        className='text-[14px] py-2'>
                                        <input
                                            type="checkbox"
                                            className='m-1'
                                            id="term"
                                        />Opt-in to receive occasional,
                                        product updates, user research invitations,
                                        company announcements, and digests.
                                    </label>
                                    <Button
                                        type="submit"
                                        name="Sign Up"
                                        classnames="w-[100%] text-center my-2 px-3 py-2 text-[14px] rounded-md bg-blue-500 text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-105 cursor-pointer"
                                    />
                                </form>
                            </div>

                        </div>
                    </>)
            }
            <div className='my-5'>
                {isLogIn ?
                    (<p>Don't have an account? <span
                        onClick={handleSwitch}
                        className='text-blue-500 font-semibold cursor-pointer hover:border-b-2 border-blue-500 mb-5 pb-1'>
                        Sign Up</span>
                    </p>) :
                    (<p>Already have an Account? <span
                        onClick={handleSwitch}
                        className='text-blue-500 font-semibold cursor-pointer hover:border-b-2 border-blue-500 mb-5 pb-1'>
                        Log In</span>
                    </p>)
                }
            </div>


        </div >
    )
}

export default Auth
