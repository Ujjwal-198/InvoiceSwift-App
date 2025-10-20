import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleSignup } from '../features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignupIllustration from '../assets/signup.svg';

const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { user, authenticated, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [viewError, setViewError] = useState(null);

    useEffect(() => {
        if (authenticated) navigate('/dashboard');
        else navigate('/signup');
    }, [user, authenticated]);

    const onSubmit = async (data) => {
        console.log('Form data in signup :', data);
        try {
            const result = await dispatch(handleSignup(data)).unwrap();
            console.log(result);
        } catch (error) {
            setViewError(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:150px_80px]">
            <div className="flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden bg-white">

                <div className="hidden md:flex items-center justify-center bg-white p-10">
                    <img
                        src={SignupIllustration}
                        alt="Signup Illustration"
                        className="w-80 h-auto object-contain"
                    />
                </div>

                <form
                    className="flex flex-col justify-center bg-white gap-y-5 p-10 w-[320px] md:w-[350px]"
                    onSubmit={handleSubmit(onSubmit)}>

                    <h1 className="text-2xl font-semibold text-center">Signup</h1>

                    {/* Name */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="name" className="text-sm text-gray-800">Name</label>
                        <input
                            placeholder='John Doe'
                            className="border border-gray-400 w-full py-1 px-4 focus:outline-none focus:shadow rounded text-sm"
                            type="text"
                            {...register('name', { required: 'Name is required' })}

                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="email" className="text-sm text-gray-800">Email</label>
                        <input
                            placeholder='example@email.com'
                            className="border border-gray-400 w-full py-1 px-4 focus:outline-none focus:shadow rounded text-sm"
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
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="password" className="text-sm text-gray-800">Password</label>
                        <input
                            placeholder='********'
                            className="border border-gray-400 w-full py-1 px-4 focus:outline-none focus:shadow rounded text-sm"
                            type="password"
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
                        />
                        <label class="text-[10px] text-gray-500" >Must me 6 Characters long and include at least one digit</label>
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Server / API Error */}
                    {viewError && <p className="text-xs text-red-500 text-center">{viewError}</p>}

                    {/* Button */}
                    <button
                        className="bg-blue-500 text-white px-5 py-1 my-1 rounded hover:bg-blue-600 transition cursor-pointer"
                    >
                        {loading ? 'Please wait...' : 'Signup'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
