import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
                {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border border-gray-300" />
                ))}
            </div>

            <div className="relative z-10 text-center px-6 md:px-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                    Build and Manage <span className="text-blue-600">Invoices</span> Easily
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Create, download, and manage invoices effortlessly on the go. Sign in to securely save your invoices and access them anytime.
                </p>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                    <button onClick={() => navigate('/invoice')} className="flex items-center space-x-2 cursor-pointer  text-white bg-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-900 hover:scale-101 transition duration-300">
                        <FaPlus />
                        <span>Start Creating Invoice</span>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-12 w-full flex justify-center">
                <div className="w-28 h-28 bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-500 transform rotate-45 shadow-2xl" />
            </div>
        </div>
    );
};

export default Home;
