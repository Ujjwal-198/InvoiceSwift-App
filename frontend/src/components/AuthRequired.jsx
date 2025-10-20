import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRequired = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Authentication Required</h1>
                <p className="text-gray-600 mb-6">
                    You need to be logged in to access this page. Please sign in to continue.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="inline-block px-3 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default AuthRequired;