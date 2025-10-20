import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-100 to-blue-200 text-white p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-5xl stroke-1 font-bold mb-4 animate-fade-in text-shadow-2 text-gray-800">
          Welcome, {user.name}!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-90 text-shadow-2 text-gray-800">
          Manage your invoices with ease and efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          <button
            className="flex items-center gap-3 bg-white text-blue-900 px-6 py-3 rounded-md font-semibold cursor-pointer hover:bg-blue-100 transition hover:text-black duration-300 shadow-lg transform hover:scale-105"
            onClick={() => navigate('/invoice')}
          >
            Create New Invoice
            <FaArrowRightLong />
          </button>
          <button
            className="flex items-center gap-3 bg-white text-blue-900 px-6 py-3 rounded-md font-semibold cursor-pointer hover:bg-blue-100 transition hover:text-black duration-300 shadow-lg transform hover:scale-105"
            onClick={() => navigate('/profile')}
          >
            My Invoices
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;