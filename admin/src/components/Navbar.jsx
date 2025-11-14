import React from 'react'
import {assets} from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
const {aToken,setAToken} = useContext(AdminContext)

const navigate = useNavigate()

const logout = ()=>{
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
}

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center text-xs gap-2'>
            <img src={assets.admin_logo} className='cursor-pointer w-36 sm:w-40' alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={()=>{logout()}} className='bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar