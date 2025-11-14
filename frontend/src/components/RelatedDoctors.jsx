import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId,speciality}) => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext) 
    const [relDoc, setRelDoc] = useState()

 useEffect(()=>{
    if(doctors.length > 0 && speciality){
    const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
    setRelDoc(doctorsData) 
    console.log(doctorsData)  
}
 },[doctors,speciality,docId])
  return (
    <div className='flex flex-col justify-center items-center gap-4 my-16'>
        <h1 className='text-3xl text-black font-medium'>Top Doctors to book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted Doctors</p>
        <div className='w-full grid grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {relDoc && relDoc.slice(0,5).map((item,idx)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} key={idx} className='border-blue-200 border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' src={item.image}/>
                    <div className='p-4 flex flex-col items-start gap-1 text-sm text-center'>
                    <div>
                    <p className='text-black text-md font-medium'>{item.name}</p>
                    </div>
                    <div>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                    </div>
                    
                </div>
            ))}   
        </div>
        <div>
            <button  onClick={()=>{navigate("/doctors") ; scrollTo(0,0)}} className='bg-blue-50 text-gray-700 px-1 py-0.5 border-2 rounded-xl'>Show More</button>
            </div>
    </div>
    
  )
}

export default RelatedDoctors