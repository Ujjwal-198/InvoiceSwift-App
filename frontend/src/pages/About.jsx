import React from 'react';
import AboutMeIllustration from '../assets/AboutMe.svg';
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsappSquare, FaCode, FaLightbulb, FaRocket } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                                Hello, I'm{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Ujjwal Singh
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                I'm a tech enthusiast with a passion for solving real-world problems through logical thinking 
                                and technology-driven solutions. My curiosity for understanding how things work inspires me to 
                                explore new tools, frameworks, and problem-solving approaches.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                I enjoy transforming ideas into structured, practical outcomes — whether it's a functional 
                                application, an analytical model, or an optimized algorithm.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => window.open('https://wa.me/918744814775', '_blank', 'noopener,noreferrer')}
                                className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
                            >
                                <FaWhatsappSquare className="text-lg" />
                                <span>WhatsApp</span>
                            </button>
                            <button 
                                onClick={() => window.open('https://www.linkedin.com/in/ujjwal-singh-b44256271', '_blank', 'noopener,noreferrer')}
                                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
                            >
                                <BsLinkedin className="text-lg" />
                                <span>LinkedIn</span>
                            </button>
                            <button 
                                onClick={() => window.open('https://github.com/Ujjwal-198', '_blank', 'noopener,noreferrer')}
                                className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
                            >
                                <FaSquareGithub className="text-lg" />
                                <span>GitHub</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src={AboutMeIllustration}
                            alt="About Me Illustration"
                            className="w-full max-w-md h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaCode className="text-blue-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">What I Do</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                I focus on developing reliable and efficient systems that combine creativity with technical precision. 
                                My work often involves exploring new technologies, designing structured solutions, and refining 
                                processes through code and logic.
                            </p>
                            <p>
                                Beyond development, I continuously refine my problem-solving abilities by practicing Data Structures 
                                and Algorithms (DSA), which strengthens my understanding of computational efficiency and logical design.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaLightbulb className="text-green-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Technical Skills</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600">Programming & Problem Solving: JavaScript, C++, Strong grasp of Data Structures and Algorithms</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600">Frameworks & Tools: React, Node.js, Express.js</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600">Database Management: MongoDB</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600">Other Competencies: REST APIs, Data Handling, Automation, Version Control (Git/GitHub)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaRocket className="text-purple-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">My Approach</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                I believe that great solutions start with clear logic and structured thinking. My approach to 
                                technology emphasizes breaking down problems, designing efficient algorithms, and implementing 
                                solutions that are both scalable and maintainable.
                            </p>
                            <p>
                                I'm committed to writing clean, optimized code and applying data structures intelligently to 
                                achieve high-performance outcomes. Whether I'm debugging a complex algorithm or designing a 
                                new interface, I aim for precision, simplicity, and real-world relevance.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FaLightbulb className="text-orange-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Looking Ahead</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                My goal is to evolve into a versatile technology professional capable of adapting across 
                                multiple domains — from software development and system design to artificial intelligence 
                                and data analysis.
                            </p>
                            <p>
                                I aspire to contribute to projects that challenge my reasoning, strengthen my technical 
                                versatility, and create meaningful technological impact through problem-solving excellence 
                                and continuous innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;