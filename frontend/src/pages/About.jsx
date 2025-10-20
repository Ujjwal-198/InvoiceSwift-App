import React from 'react';
import AboutMeIllustration from '../assets/AboutMe.svg';
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const About = () => {
    return (
        <div className='flex flex-col gap-10 align-middle p-10 md:py-20 md:px-25  min-h-screen w-full'>

            <div className='flex flex-col gap-y-10 align-middle justify-around items-center'>
                <div className='flex flex-row align-middle justify-around items-center'>
                    {/* About me hero section */}
                    <div className="hidden md:flex items-center justify-center bg-white px-10">
                        <img
                            src={AboutMeIllustration}
                            alt="Signup Illustration"
                            className="w-400 h-auto object-contain"
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-3xl font-bold'>Hello, I'm <span className='text-blue-500'>Ujjwal Singh</span></h1>
                        <p className='text-md text-gray-800'>I’m a tech enthusiast with a passion for solving real-world problems through logical thinking and technology-driven solutions. My curiosity for understanding how things work inspires me to explore new tools, frameworks, and problem-solving approaches. </p>
                        <p className='text-md text-gray-800'>I enjoy transforming ideas into structured, practical outcomes — whether it’s a functional application, an analytical model, or an optimized algorithm.</p>
                        <div className='flex align-middle justify-around  py-5'>
                            <button onClick={() => window.open('https://wa.me/918744814775', '_blank', 'noopener,noreferrer')
                            } className='flex flex-row align-middle items-center justify-center gap-2 bg-green-500 px-4 py-1 text-white rounded cursor-pointer hover:bg-green-600 transition'>Whatsapp <FaWhatsappSquare className='text-xl' /></button>
                            <button onClick={() => window.open('https://www.linkedin.com/in/ujjwal-singh-b44256271', '_blank', 'noopener,noreferrer')
                            } className='flex flex-row align-middle items-center justify-center gap-2 bg-blue-500 px-4 py-1 text-white rounded cursor-pointer hover:bg-blue-600 transition'>LinkedIn <BsLinkedin /></button>
                            <button onClick={() => window.open('https://github.com/Ujjwal-198', '_blank', 'noopener,noreferrer')
                            } className='flex flex-row align-middle items-center justify-center gap-2 bg-gray-600 px-4 py-1 text-white rounded cursor-pointer hover:bg-gray-700 transition'>Github <FaSquareGithub className='text-md' /></button>
                        </div>
                    </div>
                </div>
                {/* Cards */}
                <div className='flex flex-col gap-12 md:px-8 px-3'>
                    <div className='flex flex-col gap-3 md:px-10 px-5 rounded-xl py-10 group shadow-sm bg-white cursor-pointer hover:scale-101 transform transition-transform duration-300'>
                        <h1 className='text-2xl font-semibold'>What I do</h1>
                        <p className='text-md text-gray-800'>I focus on developing reliable and efficient systems that combine creativity with technical precision. My work often involves exploring new technologies, designing structured solutions, and refining processes through code and logic.
                        </p>
                        <p className='text-md text-gray-800'>Beyond development, I continuously refine my problem-solving abilities by practicing Data Structures and Algorithms (DSA), which strengthens my understanding of computational efficiency and logical design.</p>
                    </div>
                    <div className='flex flex-col gap-3 md:px-10 px-5 w-full rounded-xl py-10 group shadow-sm bg-white cursor-pointer hover:scale-101 transform transition-transform duration-300'>
                        <h1 className='text-2xl font-semibold'>Technical Skills</h1>
                        <div className='flex align-middle'>
                            <ul className='flex flex-col gap-y-1 list-disc'>
                                <li className='text-gray-900 text-md'>Programming & Problem Solving: JavaScript, C++, Strong grasp of Data Structures and Algorithms</li>
                                <li className='text-gray-900 text-md'>Frameworks & Tools: React, Node.js, Express.js </li>
                                <li className='text-gray-900 text-md'>Database Management: MongoDB</li>
                                <li className='text-gray-900 text-md'>Other Competencies: REST APIs, Data Handling, Automation, Version Control (Git/GitHub)</li>
                                <li className='text-gray-900 text-md'>Soft Skills: Analytical thinking, adaptability, teamwork, structured reasoning, and continuous learning</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 md:px-10 px-5 rounded-xl py-10 group shadow-sm bg-white cursor-pointer hover:scale-101 transform transition-transform duration-300'>
                        <h1 className='text-2xl font-semibold'>My Approach</h1>
                        <p className='text-gray-900 text-md'>I believe that great solutions start with clear logic and structured thinking. My approach to technology emphasizes breaking down problems, designing efficient algorithms, and implementing solutions that are both scalable and maintainable. </p>
                        <p className='text-gray-900 text-md'>I’m committed to writing clean, optimized code and applying data structures intelligently to achieve high-performance outcomes.
                            Whether I’m debugging a complex algorithm or designing a new interface, I aim for precision, simplicity, and real-world relevance.</p>
                    </div>
                    <div className='flex flex-col gap-3 md:px-10 px-5 rounded-xl py-10 group shadow-sm bg-white cursor-pointer hover:scale-101 transform transition-transform duration-300'>
                        <h1 className='text-2xl font-semibold'>Looking Ahead</h1>
                        <p className='text-gray-900 text-md'>My goal is to evolve into a versatile technology professional capable of adapting across multiple domains — from software development and system design to artificial intelligence and data analysis.
                        </p>
                        <p className='text-gray-900 text-md'>I aspire to contribute to projects that challenge my reasoning, strengthen my technical versatility, and create meaningful technological impact through problem-solving excellence and continuous innovation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
