import React from 'react'
import { NavLink } from 'react-router-dom'
import { MobileMenuNavLink } from '../constants'

const SmallDeviceMenuBar = () => {
    return (
        <div className='bg-[#525050da] flex justify-evenly items-center p-2 border-t-4 border-orange-400'>
            {MobileMenuNavLink.map(({ key, name, img, to }) => (
                <NavLink key={key} to={to} activeclass="active">
                    <div className='w-full flex justify-center items-center p-2'>
                        <img src={img} className="w-[16px] m-1" />
                        <p className='font-semibold text-white hover:text-orange-500'>{name}</p>
                    </div>
                </NavLink>
            ))}
        </div >
    )
}

export default SmallDeviceMenuBar
