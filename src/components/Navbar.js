import React, { useState, useRef, useEffect } from 'react';
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

  let modalRef = useRef();

  const outSideClick = (e) => {
    if (toogle && modalRef.current && !modalRef.current.contains(e.target)) {
      setToogle(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);
  });

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
          <Link to='/'>PV Design Simulation</Link>
        </div>
        <div className='text-md font-bold text-stone-600'>Welcome {auth.userEmail} </div>
        {toogle &&
          <ul ref={modalRef} className='bg-white border-stone-500  hover:border-orange-500 dark:bg-stone-300 absolute top-16 right-2 w-40 flex flex-col items-start border-[0.1px] dark:border-neutral-400'>
            <li className='flex w-full justify-between relative group'>
              <Link onClick={logout} className='relative z-10 text-xs border-l-orange-500 text-slate-800 flex w-full justify-between hover:text-white cursor-pointer border-l-2 p-2' to='/'>Logout</Link>
              <span className="absolute left-0 w-0 h-full bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </li>
          </ul>
        }

        <div className='flex items-center justify-center rounded-full w-12 h-12 bg-orange-500 dark:bg-stone-300 mr-4 dark:hover:bg-white hover:bg-orange-600'>
          {!toogle && <div onClick={openMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white dark:text-stone-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg></div>}
          {toogle && <div onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white dark:text-stone-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;