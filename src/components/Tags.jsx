import React from 'react';
import SearchInput from './SearchInput';
import { Search } from '../assets'


const Tags = () => {
    return (
        <div className='w-full flex p-5 ' >
            <div className='w-[80%]  flex flex-col justify-start items-start'>
                <div>
                    <h1 className='text-[25px] py-2'>Tags</h1>
                </div>
                <div className=' text-gray-600 w-[80%] py-2'>
                    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                </div>
                <div className='w-[200px]'>
                    <SearchInput
                        image={Search}
                        imageclass="w-[14px]  relative top-[28px] left-[15px] z-[9]"
                        placeholdertext="Search Tags..."
                        classnames='text-[14px] outline-blue-300 focus:shadow-md shadow-blue-200 p-2 pl-10 border-2 border-gray-300 rounded-sm relative w-[100%]' />
                </div>
                <div className='my-5'>

                    <div className='border-2 w-[300px] text-[14px] text-gray-500 p-2'>
                        <div className="rounded-[5px] bg-[#a7dafca4] text-[#335977] p-2 inline-block">JavaScript</div>
                        <p className='my-2'>For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Keep in mind</p>
                        <div className='my-2 flex justify-between items-center'>
                            <div className='flex flex-col'>
                                <p className='font-semibold'>12344</p>
                                <p>Questions</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold'>today</p>
                                <p>Asked</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Tags
