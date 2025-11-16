import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector } from 'react-redux';
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaHeart } from "react-icons/fa";

const Footer = () => {
    const { authenticated } = useSelector((state) => state.user);
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">IS</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">InvoiceSwift</h2>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                                Create professional invoices in minutes. Streamline your billing process with our modern, 
                                user-friendly invoice management system.
                            </p>
                            <div className="flex space-x-4 mt-6">
                                <button 
                                    onClick={() => window.open('https://github.com/Ujjwal-198', '_blank', 'noopener,noreferrer')} 
                                    className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="text-lg" />
                                </button>
                                <button 
                                    onClick={() => window.open('https://www.linkedin.com/in/ujjwal-singh-b44256271', '_blank', 'noopener,noreferrer')} 
                                    className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn className="text-lg" />
                                </button>
                                <button 
                                    onClick={() => window.open('https://wa.me/918744814775', '_blank', 'noopener,noreferrer')} 
                                    className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                            <nav className="space-y-3">
                                <NavLink 
                                    to={authenticated ? '/dashboard' : '/'} 
                                    className={({ isActive }) => 
                                        `block text-sm transition-colors duration-200 hover:text-blue-400 ${
                                            isActive ? 'text-blue-400' : 'text-gray-300'
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink 
                                    to="/services" 
                                    className={({ isActive }) => 
                                        `block text-sm transition-colors duration-200 hover:text-blue-400 ${
                                            isActive ? 'text-blue-400' : 'text-gray-300'
                                        }`
                                    }
                                >
                                    Services
                                </NavLink>
                                <NavLink 
                                    to="/about" 
                                    className={({ isActive }) => 
                                        `block text-sm transition-colors duration-200 hover:text-blue-400 ${
                                            isActive ? 'text-blue-400' : 'text-gray-300'
                                        }`
                                    }
                                >
                                    About
                                </NavLink>
                                <NavLink 
                                    to="/contact" 
                                    className={({ isActive }) => 
                                        `block text-sm transition-colors duration-200 hover:text-blue-400 ${
                                            isActive ? 'text-blue-400' : 'text-gray-300'
                                        }`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </nav>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li>• Create Invoices</li>
                                <li>• PDF Generation</li>
                                <li>• Multi-Currency</li>
                                <li>• Secure Storage</li>
                                <li>• User Dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <span>© {currentYear} InvoiceSwift. Made with</span>
                            <FaHeart className="text-red-500 text-xs" />
                            <span>by Ujjwal Singh</span>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
