import React from 'react'
import { Message, Pen, Stack } from '../assets'
import { RightBarTags } from '../constants'

const RightSideBar = () => {
    return (
        <div className='lg:flex flex-col w-[30%] text-[14px] m-3 hidden'>
            <div>
                <div className='bg-[#fdf7e2] shadow-lg border-2 border-[#f1e5bc] '>
                    <div className='bg-[#fbf3d5] p-4 border-b-2 border-[#f1e5bc] '>
                        <h1 className='font-semibold text-gray-600'> The Overflow Blog</h1>
                    </div>
                    <p className='p-2 flex text-black items-start'><img src={Pen} className="w-[25px] p-1" />Observability is the key to the future of software(and your DevOps career).</p>
                    <p className='p-2 flex text-black items-start'><img src={Pen} className="w-[25px] p-1" />Podcast 374: How valuable is your screen name?</p>
                </div>
                <div className='bg-[#fdf7e2] shadow-lg border-2 border-[#f1e5bc] '>
                    <div className='bg-[#fbf3d5]  p-4 border-b-2 border-[#f1e5bc] '>
                        <h1 className='font-semibold text-gray-600'>Featured on Meta</h1>
                    </div>
                    <p className='p-2 flex text-black items-start'><img src={Message} className="w-[25px] p-1" />Review queue workflows-Final release ....</p>
                    <p className='p-2 flex text-black items-start'><img src={Message} className="w-[25px] p-1" />Please welcome Valued Associates:#958-V2Blast#959-SpencerG</p>
                    <p className='p-2 flex text-black items-start'><img src={Stack} className="w-[25px] p-1" />Outdated Answers:accepted answer is now unpinned on Stack Overflow</p>
                </div>
                <div className='bg-[#fdf7e2] shadow-lg border-2 border-[#f1e5bc] '>
                    <div className='bg-[#fbf3d5]  p-4 border-b-2 border-[#f1e5bc] '>
                        <h1 className='font-semibold text-gray-600'>Hot Meta Posts</h1>
                    </div>
                    <p className='p-2 flex text-black items-start'>11 Why was this spam flag declined,yet the question marked as spam?</p>
                    <p className='p-2 flex text-black items-start'>38 What is the best course of action when a user has high enough rep in to to ...</p>
                    <p className='p-2 flex text-black items-start'>04 Is a link to the "How to ask' help page a useful comment?</p>
                </div>
            </div>
            <div className='bg-white shadow-lg border-2 border-[#e3e6e8] '>
                <div className='bg-[#f8f9f9]  p-4 border-b-2 border-[#e3e6e8] '>
                    <h1 className='font-semibold text-gray-600'>Watched Tags</h1>
                </div>
                <div className='p-2'>
                    {RightBarTags.map((tag, index) => (
                        <div key={index}
                            className="rounded-[5px] bg-[#a7dafca4] text-[#335977] m-2 px-2 py-1 inline-block">{tag}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightSideBar
