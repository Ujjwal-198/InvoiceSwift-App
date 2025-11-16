import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { handleLogin } from '../features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import loginIllustration from '../assets/login.svg';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, authenticated, loading } = useSelector((state) => state.user);
    const [viewError, setViewError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (authenticated) navigate('/dashboard')
        else navigate('/login');
    }, [user, authenticated]);

    const onSubmit = async (data) => {
        console.log('Form data in Login Page :', data);
        try {
            const result = await dispatch(handleLogin(data)).unwrap();
            console.log(result);
        } catch (error) {
            setViewError(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Illustration Side */}
                    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-12">
                        <div className="text-center space-y-6">
                            <img
                                src={loginIllustration}
                                alt="Login Illustration"
                                className="w-80 h-auto object-contain mx-auto"
                            />
                            <div className="text-white space-y-2">
                                <h2 className="text-2xl font-bold">Welcome Back</h2>
                                <p className="text-blue-100">Sign in to manage your invoices</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-8 lg:p-12">
                        <div className="max-w-md mx-auto">
                            <div className="text-center space-y-2 mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
                                <p className="text-gray-600">Welcome back! Please sign in to your account</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: 'Invalid email format',
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: 'Email must be less than 100 characters',
                                                },
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must be at least 6 characters',
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: 'Password must be less than 20 characters',
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/,
                                                    message: 'Password must contain at least one letter and one number',
                                                },
                                            })}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>

                                {/* Error Message */}
                                {viewError && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                        <p className="text-red-600 text-sm text-center">{viewError}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>

                                {/* Signup Link */}
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                                            Create one
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;