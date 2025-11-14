import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <p></p><span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} />
      
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-gray-600 text-lg '>Our Office</p><p>Office No. 502<br/>
        5th Floor<br/>
        Skyline Tower, Park Road<br/>
        Civil Lines<br/>
        Kanpur – 208001<br/>
          Uttar Pradesh,
          India
         </p> 
          
          
       </div> 
      </div>
    </div>
  )
}

export default Contact