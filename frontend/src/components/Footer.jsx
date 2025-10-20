import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector } from 'react-redux';
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    const { authenticated } = useSelector((state) => state.user);
    return (
        <footer className='footer w-full bg-white text-base-content text-center footer-center py-5 px-10 border-t-1 border-gray-300 shadow-sm'>
            <div className='flex flex-col align-middle justify-between'>
                <div className='flex flex-col md:flex-row align-middle justify-between items-center gap-y-5'>
                    <div>
                        <h1 className='text-2xl font-bold'>InvoiceSwift</h1>
                    </div>
                    <div>
                        <nav className='flex flex-row gap-x-10'>
                            <NavLink to={authenticated ? 'dashboard' : '/'} className={({ isActive }) => `text-md underline ${isActive ? 'text-blue-400' : 'text-gray-800 font-medium'} `} >Home</NavLink>
                            <NavLink to="/services" className={({ isActive }) => `text-md underline ${isActive ? 'text-blue-400' : 'text-gray-800 font-medium'} `} >Services</NavLink>
                            <NavLink to="/about" className={({ isActive }) => `text-md underline ${isActive ? 'text-blue-400' : 'text-gray-800 font-medium'} `} >About</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `text-md underline ${isActive ? 'text-blue-400' : 'text-gray-800 font-medium'} `} >Contact</NavLink>
                        </nav>
                    </div>
                </div>
                <div>
                    <hr className='my-5 text-gray-400 mx-10' />
                </div>
                <div className="flex space-x-4 items-center justify-center">
                    <button onClick={() => window.open('https://github.com/Ujjwal-198', '_blank', 'noopener,noreferrer')} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                        <i className="fab fa-github text-xl"></i>
                    </button>
                    <button onClick={() => window.open('https://www.linkedin.com/in/ujjwal-singh-b44256271', '_blank', 'noopener,noreferrer')
                    } className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                        <i className="fab fa-linkedin-in text-xl"></i>
                    </button>
                    <button onClick={() => window.open('https://wa.me/918744814775', '_blank', 'noopener,noreferrer')
                    } className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                        <FaWhatsapp className='text-xl' />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
