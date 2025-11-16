import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../features/userSlice.js';
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { HiMenuAlt3, HiX } from "react-icons/hi";

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
        <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink 
                        to={authenticated ? '/dashboard' : '/'} 
                        className="flex items-center space-x-2 group"
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
                            <span className="text-white font-bold text-sm">IS</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            InvoiceSwift
                        </span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to={authenticated ? '/dashboard' : '/'} 
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/services" 
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                                }`
                            }
                        >
                            Services
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                                }`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                                    isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <button
                            onClick={() => { authenticated ? navigate('/profile') : navigate('/signup') }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                            {authenticated && <CgProfile className="text-lg" />}
                            <span>{authenticated ? 'Profile' : 'Sign Up'}</span>
                        </button>

                        <button
                            onClick={() => { authenticated ? handleLogoutClick() : navigate('/login') }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
                        >
                            <span>{authenticated ? 'Logout' : 'Login'}</span>
                            {authenticated ? <CiLogout className="text-lg" /> : <CiLogin className="text-lg" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenuAlt3 className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink
                                to={authenticated ? '/dashboard' : '/'}
                                className={({ isActive }) => 
                                    `block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/services"
                                className={({ isActive }) => 
                                    `block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Services
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => 
                                    `block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => 
                                    `block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </NavLink>
                        </div>
                        
                        {/* Mobile Auth Buttons */}
                        <div className="px-2 pb-3 border-t border-gray-100 pt-3">
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => {
                                        authenticated ? navigate('/profile') : navigate('/signup');
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                >
                                    {authenticated && <CgProfile className="text-lg" />}
                                    <span>{authenticated ? 'Profile' : 'Sign Up'}</span>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        authenticated ? handleLogoutClick() : navigate('/login');
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200"
                                >
                                    <span>{authenticated ? 'Logout' : 'Login'}</span>
                                    {authenticated ? <CiLogout className="text-lg" /> : <CiLogin className="text-lg" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
