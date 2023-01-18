import React, { useEffect } from 'react'
import { Avatar } from './index';
import SearchInput from './SearchInput';
import { Search } from '../assets'
import { useDispatch, useSelector } from 'react-redux';
import { GetUserData } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetUserData());
    }, [dispatch]);

    const Users = useSelector((state) => (state.userReducer))

    return (
        <div className='w-full flex justify-center items-center p-5 ' >
            <div className='w-full flex flex-col justify-start items-start'>
                <div>
                    <h1 className='text-[25px] py-2'>Users</h1>
                </div>
                <div className='w-[200px]'>
                    <SearchInput
                        image={Search}
                        imageclass="w-[14px]  relative top-[28px] left-[15px] z-[1]"
                        placeholdertext="Search Tags..."
                        classnames='text-[14px] outline-blue-300 focus:shadow-md shadow-blue-200 p-2 pl-10 border-2 border-gray-300 rounded-sm relative w-[100%]' />
                </div>
                <div className='w-full my-5 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center items-center'>
                    {
                        Users && Users.map((user, index) => (
                            <Link
                                to={user._id}
                                key={user._id}
                                className=" transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-blue-500">
                                <div

                                    className='border-2 text-[14px] overflow-hidden text-gray-500 p-2'>
                                    <div className="rounded-[5px] text-[#335977]">
                                        <div className='flex justify-center items-center'>
                                            <Avatar
                                                name={user.name.charAt(0).toUpperCase()}
                                                classnames='rounded-[50%] bg-purple-600 text-white text-[20px] m-2 py-2 px-4' />
                                        </div>
                                        <p className='font-bold text-[20px] text-center'>{user.name.toUpperCase()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Users
