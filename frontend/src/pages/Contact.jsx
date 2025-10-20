// src/pages/Contact.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import ContactIllustration from '../assets/contact.svg';
import { FiSend } from "react-icons/fi";

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const phoneNumber = '918744814775';

        const message = `
            Name: ${data.name}
            Email: ${data.email}
            Message: ${data.message}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
        reset();
    };

    return (
        <div className='flex align-middle justify-center items-center p-10 min-h-screen bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:150px_80px]'>
            <div className='flex flex-row align-middle justify-center items-center shadow-2xl p-10 rounded-2xl bg-white'>

                {/* Illustration Section */}
                <div className="hidden md:flex items-center justify-center bg-white p-5">
                    <img
                        src={ContactIllustration}
                        alt="Contact Illustration"
                        className="h-60 w-auto object-contain"
                    />
                </div>

                {/* Form Section */}
                <div className='flex flex-col gap-5'>
                    <h1 className='text-xl font-semibold'>Contact Me</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:py-0 py-5 gap-7 md:w-xs w-xs'>

                            {/* Name Input */}
                            <input
                                type='text'
                                placeholder='Your Name'
                                {...register('name', { required: 'Name is required' })}
                                className='border rounded border-gray-500 focus:outline-none px-3 py-1 text-sm active:bg-transparent focus:bg-transparent focus:shadow'
                            />
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}

                            {/* Email Input */}
                            <input
                                type='email'
                                placeholder='Your Email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email address'
                                    }
                                })}
                                className='border rounded border-gray-500 focus:outline-none px-3 py-1 text-sm active:bg-transparent focus:bg-transparent focus:shadow'
                            />
                            {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}

                            {/* Message Textarea */}
                            <textarea
                                placeholder='Type your message here'
                                {...register('message', { required: 'Message cannot be empty' })}
                                className='border rounded border-gray-500 focus:outline-none px-3 py-1 min-h-10 min-w-50 text-sm active:bg-transparent focus:bg-transparent focus:shadow'
                            />
                            {errors.message && <p className='text-red-500 text-xs'>{errors.message.message}</p>}

                            {/* Submit Button */}
                            <button
                                type='submit'
                                className='flex gap-2 align-middle justify-center items-center bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 cursor-pointer rounded'
                            >
                                Send Your Message <FiSend />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
