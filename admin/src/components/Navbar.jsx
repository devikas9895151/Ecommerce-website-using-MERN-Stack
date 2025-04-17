import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className="w-32"  src={assets.logo} alt="logo" />
      <button onClick={() =>setToken('')} className='bg-gray-600 text-white px-7 sm:py-2 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
