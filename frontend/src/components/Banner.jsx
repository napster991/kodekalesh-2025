import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()
  return (
    <div className='flex flex-row bg-[#5f6fff] px-6 sm:px-10 md:px-14 lg:px-12 my-20 rounded-md'>
        <div className='py-8 sm:py-10 lg:py-24 md:py-16 lg:pl-5'>
            <p className='text-white text-4xl font-bold'>
                Book Appointment
            </p>
            <p className=' mt-4 text-white text-4xl font-bold'> With 100+ Trusted Doctors</p>
            <button onClick={()=>{navigate("/login")}} className='bg-stone-300 rounded-xl px-4 py-2 mt-10'>
                Create Account
            </button>
        </div>
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
<img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img}/>
        </div>
    </div>
  )
}

export default Banner