import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserInvoices } from '../components/index.js'
import { handleDeleteUser, handleLogout } from '../features/userSlice.js';
import { MdDeleteOutline } from "react-icons/md";

const Profile = () => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account and all associated Invoices? This action cannot be undone.")) {
            return;
        }
        try {
            await dispatch(handleDeleteUser()).unwrap();
            await dispatch(handleLogout()).unwrap();
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to delete account:', error);
            alert('Failed to delete account: ' + (error?.message || error || 'Unknown error'));
        }
    };

    return (
        <div className='flex flex-col align-middle  p-10 bg-gray-100 min-h-screen'>
            <div className='flex flex-col align-middle items-start justify-center gap-2 my-5'>
                <h1 className='text-4xl font-semibold'>Welcome, {user.name}!</h1>
                <p className='text-sm text-gray-900'>Email: {user.email}</p>
                <button
                    onClick={() => handleDeleteAccount()}
                    className='flex flex-row justify-center items-center gap-x-2 text-sm text-red-500 hover:bg-red-500 hover:text-white border transition duration-200 border-red-500 rounded px-2 py-1 mt-1 cursor-pointer'
                >
                    Delete your Account
                    <MdDeleteOutline />
                </button>
            </div>
            <div>
                <UserInvoices />
            </div>
        </div>
    );
}

export default Profile;
