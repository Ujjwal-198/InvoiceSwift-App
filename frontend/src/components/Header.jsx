import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../features/userSlice.js';
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.user);

    const handleLogoutClick = async () => {
        try {
            await dispatch(handleLogout()).unwrap();
        } catch (error) {
            console.log(error);
        }
        finally {
            navigate('/');
        }
    }

    useEffect(() => {
        if (authenticated) navigate('/dashboard')
        else navigate('/');
    }, [authenticated]);

    return (
        <header className='flex items-center h-12 justify-between p-5 px-10 shadow-sm text-white'>
            <div className='flex mx-auto justify-between w-full items-center'>

                <NavLink to={authenticated ? 'dashboard' : '/'} className="text-2xl font-bold cursor-pointer text-black">
                    InvoiceSwift
                </NavLink>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex space-x-4'>
                    <NavLink to={authenticated ? 'dashboard' : '/'} className={({ isActive }) => `font-medium ${isActive ? 'text-blue-400' : 'text-gray-800'} `} >Home</NavLink>
                    <NavLink to="/services" className={({ isActive }) => `font-medium ${isActive ? 'text-blue-400' : 'text-gray-800'} `} >Services</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `font-medium ${isActive ? 'text-blue-400' : 'text-gray-800'} `} >About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `font-medium ${isActive ? 'text-blue-400' : 'text-gray-800'} `} >Contact</NavLink>
                </nav>
                <div className='flex space-x-2'>
                    <button
                        onClick={() => { authenticated ? navigate('/profile') : navigate('/signup') }}
                        className='hidden md:flex items-center gap-2 text-black hover:bg-gray-100 px-4 py-1 rounded-full shadow transition cursor-pointer'
                    >
                        {authenticated && <CgProfile className="text-md" />}
                        {authenticated ? 'Profile' : 'Signup'}
                    </button>

                    <button
                        onClick={() => { authenticated ? handleLogoutClick() : navigate('/login') }}
                        className='hidden md:flex items-center gap-2 text-white bg-black hover:bg-gray-900 px-4 rounded-full shadow transition cursor-pointer'
                    >{authenticated ? 'Logout' : 'Login'}
                        {authenticated ? <CiLogout /> : <CiLogin />}
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                <div className='md:hidden' >
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none cursor-pointer">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                {isOpen && (
                    <nav className='absolute top-12 left-0 w-full bg-white z-59 shadow-md md:hidden rounded-md divide-y divide-gray-200 px-2'>

                        <NavLink to={authenticated ? 'dashboard' : '/'} className={({ isActive }) => `font-medium block px-4 py-2 text-black ${isActive ? 'text-blue-400' : 'text-gray-800'} `} onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink to="/services" className={({ isActive }) => `font-medium block px-4 py-2 text-black ${isActive ? 'text-blue-400' : 'text-gray-800'} `} onClick={() => setIsOpen(false)}>Services</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `font-medium block px-4 py-2 text-black ${isActive ? 'text-blue-400' : 'text-gray-800'}`} onClick={() => setIsOpen(false)}>About</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `font-medium block px-4 py-2 text-black ${isActive ? 'text-blue-400' : 'text-gray-800'}`} onClick={() => setIsOpen(false)}>Contact</NavLink>
                        <div className='flex gap-x-3 px-4 py-3'>
                            <button
                                className={`text-sm px-3 py-1 rounded-full bg-black text-white flex items-center gap-2 border-1 cursor-pointer hover:bg-gray-900'
                                    }`}
                                onClick={() => {
                                    if (authenticated) {
                                        handleLogoutClick();
                                    } else {
                                        navigate('/login');
                                    }
                                    setIsOpen(false);
                                }}
                            >
                                {authenticated ? 'Logout' : 'Login'}
                                {authenticated ? <CiLogout /> : <CiLogin />}
                            </button>
                            <button
                                className={`text-sm px-3 py-1 rounded-full bg-white text-black flex items-center gap-2 border-1 cursor-pointer hover:bg-gray-100 shadow transition `}
                                onClick={() => {
                                    if (authenticated) {
                                        navigate('/profile');
                                    } else {
                                        navigate('/signup');
                                    }
                                    setIsOpen(false);
                                }}
                            >
                                {authenticated && <CgProfile className="text-md" />}
                                {authenticated ? 'Profile' : 'Signup'}
                            </button>
                        </div>

                    </nav>
                )}

            </div>
        </header>
    );
}

export default Header;
