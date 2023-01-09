import React, { useEffect } from 'react'
import { Logo, Menu, Search } from '../assets';
import { Navlinks } from '../constants';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Avatar, Button, SearchInput } from './index.js';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/actions/currentUserActions.js';
import decode from "jwt-decode";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const User = useSelector((state) => { return state.currentUserReducer })
    // console.log(User)

    const handleLogOut = () => {
        localStorage.removeItem("Profile");
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/");

        const TokenExpire = () => {
            const token = User?.token;
            if (token) {
                const decodeToken = decode(token);
                if (decodeToken.exp * 1000 < new Date().getTime()) {
                    handleLogOut();
                }
            }
        }
        useEffect(() => {
            User && TokenExpire();
            dispatch(getCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        }, [dispatch])
    }


    return (
        <div className='flex flex-col justify-center items-center sticky top-0 z-[9]'>
            <nav className='flex justify-around items-center w-full h-[60px] shadow-md bg-gray-100 border-t-4 border-orange-400 '>
                <div className='w-[150px] sm:w-[200px] sm:p-3 sm:mx-2 hover:bg-gray-200'>
                    <Link to="/">
                        <img
                            src={Logo}
                            className="w-[100%]"
                        />
                    </Link>
                </div>
                <div className='hidden sm:flex'>
                    <ul className='flex'>
                        {
                            Navlinks.map(({ id, name, to }) => (
                                <li key={id}>
                                    <NavLink
                                        to={to}
                                        className=" text-[14px] text-gray-500 px-4 py-2 inline-block rounded-full hover:bg-gray-200  hover:text-black"
                                    >{name}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='md:flex items-center md:basis-2/4 hidden '>
                    <SearchInput
                        image={Search}
                        imageclass="w-[14px]  relative left-[30px] z-[9]"
                        placeholdertext="Search..."
                        classnames='text-[14px] outline-blue-300 focus:shadow-md shadow-blue p-1 pl-10 border-2 border-gray-300 rounded-md relative w-full' />
                </div>
                <div className='flex items-center  '>
                    {!User ?
                        (<Link
                            to="/auth"
                        > <Button
                                name="Log In"
                                classnames="px-2 py-1 border-2 border-blue-600 text-[14px] bg-gray-300 text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110"
                            />
                        </Link>) :
                        (<>
                            <Link to={`/users/${User?.result?._id}`}>
                                <Avatar
                                    name={User?.result?.name.charAt(0).toUpperCase()}
                                    classnames='rounded-[50%] bg-purple-600 text-white text-[20px] m-2 py-2 px-4' />
                            </Link>
                            <Button
                                onClick={handleLogOut}
                                name="Log Out"
                                classnames="px-2 py-1 border-2 border-blue-600 text-[14px] bg-gray-300 text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 hidden sm:flex"
                            />
                        </>
                        )
                    }
                </div>
            </nav>
            <div className='flex justify-center items-center md:hidden my-2 w-full'>
                <SearchInput
                    image={Search}
                    imageclass="w-[14px]  relative left-[30px] z-[9]"
                    placeholdertext="Search..."
                    classnames='w-full text-[14px] outline-blue-300 focus:shadow-md shadow-blue p-1 pl-10 border-2 border-gray-300 rounded-md relative mr-3' />
            </div>
        </div>

    )
}

export default Navbar
