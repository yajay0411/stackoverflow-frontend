import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home } from '../assets';
import { AsideBarNavLink } from '../constants'
import "../index.css";

const LeftSideBar = () => {
    return (
        <>
            <div className='sm:w-[18.5%] fixed bg-white sm:bg-transparent top-16 shadow-lg border-2 sm:shadow-none sm:border-none px-3 md:px-5'>
                <NavLink to="/"  >
                    <div className='flex justify-start items-center active:bg-gray-100 active:border-r-4 border-orange-400 py-3  text-[14px] text-gray-500 active:font-bold active:text-black
                     hover:text-black'>
                        <img src={Home} className="w-[16px] m-1" />
                        <p className='p-1'>Home</p>
                    </div>
                </NavLink>
                <div className='w-full flex flex-col py-2 text-gray-500 text-[14px]'>
                    <span>PUBLIC</span>
                    <span className='flex justify-between items-start py-2 w-full'>
                        <span className='flex flex-col w-full'>
                            {AsideBarNavLink.map(({ key, name, img, to }) => (
                                <NavLink
                                    key={key}
                                    to={to}
                                    className='active:bg-gray-100 active:border-r-4 border-orange-400 py-2 
                                    hover:text-black active:font-bold active:text-black'
                                    activeclass="active"
                                ><div className='w-full flex justify-start items-center'
                                ><img src={img} className="w-[16px] m-1" />
                                        <p className='p-1'>{name}</p>
                                    </div>
                                </NavLink>
                            ))}
                        </span>
                    </span>
                </div>
            </div>
        </ >
    )
}

export default LeftSideBar
