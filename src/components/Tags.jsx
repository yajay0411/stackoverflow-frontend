import React from 'react';
import SearchInput from './SearchInput';
import { Search } from '../assets';
import { tagsForTagsPage } from '../constants';



const Tags = () => {
    return (
        <div className='w-full flex p-5 ' >
            <div className='w-full flex flex-col justify-start items-start'>
                <div>
                    <h1 className='text-[25px] py-2'>Tags</h1>
                </div>
                <div className=' text-gray-600 w-[80%] py-2'>
                    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                </div>
                <div className='w-[200px]'>
                    <SearchInput
                        image={Search}
                        imageclass="w-[14px]  relative top-[28px] left-[15px] z-[1]"
                        placeholdertext="Search Tags..."
                        classnames='text-[14px] outline-blue-300 focus:shadow-md shadow-blue-200 p-2 pl-10 border-2 border-gray-300 rounded-sm relative w-[100%]' />
                </div>
                <div className='w-full my-5 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center items-center'>
                    {tagsForTagsPage.map(({ tagName, tagDescription, tagQuestions }, index) => (
                        <div
                            key={index}
                            className='border-2 text-[14px] text-gray-500 w-full sm:w-[250px] flex flex-col justify-center items-start p-5 '>
                            <div className="rounded-[5px] bg-[#a7dafca4] text-[#335977] p-2 inline-block">{tagName}</div>
                            <p className='my-2'>{tagDescription}</p>
                            <div className='w-full my-2 flex justify-start items-center'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>{tagQuestions}</p>
                                    <p>Questions</p>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>

    )
}

export default Tags
