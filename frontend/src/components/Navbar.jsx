// Navbar.jsx
import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount,navigate,token,setToken,setCartItems } = useContext(ShopContext);


  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    
  }
  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>
      <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-gray-700'>
  <NavLink to='/' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-black pb-1' : 'pb-1'}`}>Home</NavLink>
  <NavLink to='/collection' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-black pb-1' : 'pb-1'}`}>Collection</NavLink>
  <NavLink to='/about' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-black pb-1' : 'pb-1'}`}>About</NavLink>
  <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'border-b-2 border-black pb-1' : 'pb-1'}`}>Contact</NavLink>
</ul>


      <div className='flex items-center gap-6'>
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        <div className='group relative'>
          
          <Link to='login'><img onClick={()=> token?null :navigate('/login') }className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile" /></Link>
          {/*dropdown*/}
          {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')}className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
          
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          {
            getCartCount() > 0 && (
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            )
          }
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar Menu */}
      <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py pl-6 border' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py pl-6 border' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
