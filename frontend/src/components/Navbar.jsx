import React, { useState } from 'react'
import {assets} from '../assets/assets'
import {NavLink, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const Navigate = useNavigate();
    const {token,setToken,userData} = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)
     
    const logoutHandler = async()=>{
        setToken('')
        localStorage.removeItem('token')
    }

    return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>{Navigate('/')}} className='w-44 cursor-pointer' src={assets.logo}/>
        <ul className='hidden md:flex items-start gap-5 font-medium'> 
            <NavLink to="/">
                <li className='py-1 '>Home</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto'/>
            </NavLink>
            {/* <NavLink to="/doctors">
                <li className='py-1 '>All Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto'/>
            </NavLink> */}
            <NavLink to="/about">
                <li className='py-1 '>About</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto'/>
            </NavLink>
            <NavLink to="/contact">
                <li className='py-1 '>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto'/>
            </NavLink>
            
            <NavLink to="/assessment">
                <li className='py-1'>Assessment</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto'/>
            </NavLink>
            
        </ul>
        <div className='flex items-center gap-4 '>
            {
                token && userData ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={userData.img}/>
                    <img className='w-2.5' src={assets.dropdown_icon}/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 text-gray-500'>
                        <p onClick={()=>{Navigate('/my-profile')}} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>{Navigate('/my-appointments')}} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={()=>{logoutHandler()}} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
                </div>
                :
                <button className='bg-[#5f6fff] rounded-xl text-white py-1 px-2'onClick={()=>{Navigate('/login')}}>
                Create Account
                </button>
            }
            <img src={assets.menu_icon} className='md:hidden w-6' alt="" />
        </div>
    </div>
  )
}

export default Navbar