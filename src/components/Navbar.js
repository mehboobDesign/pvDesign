import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from '../context/AuthProvider';
import UseAuth from "./Hooks/UseAuth";
import Axios from '../api/Axios';

const LOGOUT = 'users/logout';


const Navbar = () => {
  const { auth } = UseAuth();
  const [toogle, setToogle] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const openMenu = () => {
    setToogle(true);
  };
  const closeMenu = () => {
    setToogle(false);
  };
  const logout = async () => {
    try {
      const response = await Axios.put(LOGOUT, {
        email: auth.userEmail,
        //password: auth.password,
      })
      console.log(JSON.stringify(response?.data));
      setAuth({});
      navigate('/');
      setToogle(false);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <>
      <nav className='w-full h-14 bg-white dark:bg-stone-200 flex justify-between items-center sticky top-0 z-20 pt-8 pb-8 border-b-[0.1px] border-neutral-200 dark:border-b-[0.1px] dark:border-neutral-200'>
        <div className="text-2xl font-bold px-4 text-orange-500 dark:text-stone-600">
          <Link to='/'>Pv_Design_Solutions</Link>
        </div>
        <div className='font-bold text-stone-600'>Welcome {auth.userEmail} </div>
        {toogle && <ul className='font-normal bg-neutral-200 border-neutral-200 dark:bg-slate-700 dark:text-cyan-50 absolute top-16 right-0 w-60 flex flex-col items-start  p-2 border-[0.1px] dark:border-slate-800'>
          {/* <li className='flex w-full justify-between'>
            <Link onClick={closeMenu} className='flex w-full justify-between hover:text-lime-300 hover:bg-slate-900 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-lime-300 border-l-4 p-4' to='disposedList'>Dispose Case</Link>
          </li>
          <li className='flex w-full justify-between'>
            <Link onClick={closeMenu} className='flex w-full justify-between hover:text-lime-300 hover:bg-slate-900 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-lime-300 border-l-4 p-4' to='pendingList'>Pending Case</Link>
          </li>
          <li className='flex w-full justify-between'>
            <Link onClick={closeMenu} className='flex w-full justify-between hover:text-lime-300 hover:bg-slate-900 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-lime-300 border-l-4 p-4' to='report'>Generate Report</Link>
          </li>
          <li className='flex w-full justify-between'>
            <Link onClick={closeMenu} className='flex w-full justify-between hover:text-lime-300 hover:bg-slate-900 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-lime-300 border-l-4 p-4' to='addCase'>Add Case</Link>
          </li> */}
          <li className='flex w-full justify-between'>
            <Link onClick={logout} className='flex w-full justify-between hover:text-lime-300 hover:bg-slate-900 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-lime-300 border-l-4 p-4' to='/'>Logout</Link>
          </li>
        </ul>}



        {/* <div className='hidden md:block px-2 py-2'>Welcome Mr. M. Alam</div> */}
        <div className='flex items-center justify-center rounded-full w-12 h-12 bg-stone-500 dark:bg-stone-300 mr-4 dark:hover:bg-white hover:bg-stone-700'>
          {!toogle && <div onClick={openMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-white dark:text-stone-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg></div>}
          {toogle && <div onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-white dark:text-stone-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;