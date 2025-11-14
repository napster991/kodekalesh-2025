import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {

  const {speciality} = useParams();
  
  const navigate = useNavigate()

  const [filterDoc,setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext)

const applyFilter = ()=>{
      if(speciality){
        setFilterDoc(doctors.filter(item =>(
          item.speciality === speciality
        )))
      }
      else{
        setFilterDoc(doctors)
      }
}

useEffect(()=>{
applyFilter()
},[doctors,speciality])

  return (
    <div>
      <p>Browse through the doctors specialist</p>
      <div className='flex flex-col sm:flex-row gap-6 mt-4'>
        <div className='w-1/5'>
          <p onClick={()=>speciality==='General Physician' ? navigate('/doctors/') : navigate('/doctors/General physician')} className={`cursor-pointer border-1 rounded-md px-4 py-1 border-blue-500  ${speciality==='General physician' ? 'bg-indigo-200' : 'bg-stone-100'}`}>General Physician</p>
          <p onClick={()=>speciality==='Gynecologist' ? navigate('/doctors/') : navigate('/doctors/Gynecologist')} className={`cursor-pointer border-1 mt-2 rounded-md px-4 py-1 border-blue-500 ${speciality==='Gynecologist' ? 'bg-indigo-100' : 'bg-stone-100'}`} >Gynecologist</p>
          <p onClick={()=>speciality==='Pediatricians' ? navigate('/doctors/') : navigate('/doctors/Pediatricians')} className={`cursor-pointer border-1 mt-2 rounded-md px-4 py-1 border-blue-500  ${speciality==='Pediatricians' ? 'bg-indigo-100' : 'bg-stone-100'}`} >Pediatricians</p> 
          <p onClick={()=>speciality==='Dermatologist' ? navigate('/doctors/') : navigate('/doctors/Dermatologist')} className={`cursor-pointer border-1 mt-2 rounded-md px-4 py-1 border-blue-500  ${speciality==='Dermatologist' ? 'bg-indigo-100' : 'bg-stone-100'}`} >Dermatologist</p>
          <p onClick={()=>speciality==='Neurologist' ? navigate('/doctors/') : navigate('/doctors/Neurologist')} className={`cursor-pointer border-1 mt-2 rounded-md px-4 py-1 border-blue-500 ${speciality==='Neurologist' ? 'bg-indigo-100' : 'bg-stone-100'}`} >Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist' ? navigate('/doctors/') : navigate('/doctors/Gastroenterologist')} className={`cursor-pointer border-1 mt-2 rounded-md px-4 py-1 border-blue-500 ${speciality==='Gastroenterologist' ? 'bg-indigo-100' : 'bg-stone-100'}`} >Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.map((item,idx)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`)}} key={idx} className='border-blue-200 border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
      </div>
    </div>
  )
}

export default Doctors