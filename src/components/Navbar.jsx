import React, { useEffect, useState } from 'react'
import { Logo, Menu, Search } from '../assets';
import { Navlinks } from '../constants';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Avatar, Button, LeftSideBar, SearchInput } from './index.js';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/actions/currentUserActions.js';
import decode from "jwt-decode";
// import { LogoutUser } from '../redux/actions/authActions';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false);

    const User = useSelector((state) => { return state.currentUserReducer?.result })
    // console.log(User)

    const Users = useSelector((state) => { return state.userReducer })
    // console.log(Users)

    const userDetail = Users?.filter((user) => (user?._id === User?._id))[0];
    // console.log(userDetail)

    const handleLogOut = () => {
        localStorage.removeItem("Profile");
        // dispatch(LogoutUser({ userId: userDetail?._id }));
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
                <div className='w-[35px] m-2 hover:bg-gray-200 sm:hidden'>
                    <img
                        src={Menu}
                        className="w-[100%]"
                        onClick={() => (setMenu((prev) => (!prev)))}
                    />
                </div>
                <div className='w-[150px] sm:w-[200px] sm:p-3 sm:mx-2 hover:bg-gray-200'>
                    <Link to="/">
                        <img
                            src={Logo}
                            className="w-[100%]"
                        />
                    </Link>
                </div>
                <div className='w-[18px] m-2 hover:bg-gray-200 sm:hidden'>
                    <img
                        src={Search}
                        className="w-[100%]"
                        onClick={() => (setSearch((prev) => (!prev)))}
                    />
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
                <div className='flex items-center justify-center'>
                    {!User ?
                        (<Link
                            to="/auth"
                        > <Button
                                name="Log In"
                                classnames="px-2 py-1 border-2 border-blue-600 text-[14px] bg-gray-300 text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110"
                            />
                        </Link>) :
                        (<>
                            {userDetail &&
                                <>
                                    <Link to={`/users/${userDetail?._id}`}>
                                        <Avatar
                                            name={userDetail?.name?.charAt(0).toUpperCase()}
                                            classnames='rounded-[50%] bg-purple-600 text-white text-[20px] m-1 sm:m-2 py-2 px-4' />
                                    </Link>
                                    <Button
                                        onClick={handleLogOut}
                                        name="Log Out"
                                        classnames="px-2 py-1 border-2 border-blue-600 text-[14px] bg-gray-300 text-blue-600 rounded-md hover:bg-blue-500 hover:text-white  font-semibold transition-all ease-in-out duration-300 hover:scale-110 hidden sm:flex"
                                    />
                                </>
                            }
                        </>

                        )
                    }
                </div>
            </nav>
            {search &&
                <div className='flex justify-center items-center md:hidden mt-2 w-full'>
                    <SearchInput
                        image={Search}
                        imageclass="w-[14px]  relative left-[30px] z-[9]"
                        placeholdertext="Search..."
                        classnames='w-full text-[14px] outline-blue-300 focus:shadow-md shadow-blue p-1 pl-10 border-2 border-gray-300 rounded-md relative mr-3' />
                </div>}
            {menu &&
                <div className='flex justify-start items-center md:hidden w-full z-10'>
                    <LeftSideBar />
                </div>}
        </div>

    )
}

export default Navbar
