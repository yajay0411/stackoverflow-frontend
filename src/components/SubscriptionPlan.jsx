import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { GetSubscriptionPlan, PlanPayment } from '../redux/actions/subcriptionActions';
import { Button } from './index';

const SubscriptionPlan = () => {

    const [email, setemail] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetSubscriptionPlan());
        setemail(currUser?.email)
    }, [dispatch])

    const subscriptionData = useSelector((state) => (state.subscriptionReducer?.data));
    // console.log(subscriptionData);
    const currUser = useSelector((state) => (state.currentUserReducer?.result));
    // console.log(currUser);
    const handleBuyPlan = async (id) => {
        dispatch(PlanPayment({id, email}));
    }

    return (
        <>
            <div className='w-full flex flex-col sm:flex-row p-1 sm:p-5' >
                <div className='w-full flex flex-col justify-center items-center'>
                    <h1 className='w-full text-[25px] sm:text-[40px] font-bold border-b-2 text-center uppercase text-red-600'>S<span className='text-[18px] sm:text-[30px] text-black'>ubscription</span> P<span className='text-[18Fpx] sm:text-[30px] text-black'>lans</span></h1>
                    <div className='flex flex-col sm:flex-row'>
                        {subscriptionData?.map((price, index) => (
                            <div
                                key={index}
                                className='w-[200px] h-[250px] border-2 shadow-md flex flex-col justify-center items-center bg-slate-100 m-5 transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-blue-500 cursor-pointer'>
                                <div className='bg-gray-400 w-[100px] h-[90px] flex justify-center items-center rounded'>
                                    <div className="bg-white w-[90px] h-[80px] flex justify-center items-center rounded">
                                        <h1 className='font-semibold text-[20px]'>₹ {price.unit_amount / 100}</h1>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => (handleBuyPlan({ id: price.id }))}
                                    name="BUY NOW"
                                    classnames="w-[60%] flex justify-center px-5 py-1 m-5 border-2 border-green-500 text-[14px] text-green-500 rounded-md hover:bg-green-500 hover:text-white font-semibold transition-all ease-in-out duration-300 hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default SubscriptionPlan
