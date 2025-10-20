import React from 'react';
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h1>
                <p className="text-gray-600 mb-6">You're now logged in. Let's get started!</p>
                <button
                    onClick={() => navigate('/invoice')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 cursor-pointer"
                >
                    Create Invoice
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;
