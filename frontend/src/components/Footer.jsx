import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div className=''>
                <img className='mb-5 w-40' src={assets.logo}/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam sapiente velit repudiandae fugit vitae natus voluptas reprehenderit molestias cumque. Nihil eveniet voluptates repellat perspiciatis illo alias quisquam quaerat sequi ut, deleniti est.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 '>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>Contact Us</li>
                    <li>About us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-2222-3338-3838</li>
                    <li>lorem@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className='text-center font-medium text-sm text-gray-500 pb-5 pt-4'>
            Copyright 2025@ prescripto - All Right Reserved. 
        </div>
    </div>
  )
}

export default Footer