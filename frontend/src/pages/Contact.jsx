import React from 'react';
import { useForm } from 'react-hook-form';
import ContactIllustration from '../assets/contact.svg';
import { FiSend, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

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

    const contactInfo = [
        {
            icon: <FiMail className="text-xl" />,
            title: "Email",
            value: "kumarujjwalsingh76@gmail.com",
            action: () => window.open('mailto:kumarujjwalsingh76@gmail.com')
        },
        {
            icon: <FiPhone className="text-xl" />,
            title: "Phone",
            value: "+91 87448 14775",
            action: () => window.open('tel:+918744814775')
        },
        {
            icon: <FiMapPin className="text-xl" />,
            title: "Location",
            value: "India",
            action: null
        }
    ];

    const socialLinks = [
        {
            icon: <FaWhatsapp className="text-xl" />,
            name: "WhatsApp",
            url: "https://wa.me/918744814775",
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            icon: <FaLinkedin className="text-xl" />,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/ujjwal-singh-b44256271",
            color: "bg-blue-600 hover:bg-blue-700"
        },
        {
            icon: <FaGithub className="text-xl" />,
            name: "GitHub",
            url: "https://github.com/Ujjwal-198",
            color: "bg-gray-800 hover:bg-gray-900"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions about InvoiceSwift? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
                                <p className="text-gray-600">Fill out the form below and I'll get back to you shortly.</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Enter a valid email address'
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        {...register('message', { required: 'Message cannot be empty' })}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Type your message here..."
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                    <span>Send Message</span>
                                    <FiSend className="text-lg" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info & Illustration */}
                    <div className="space-y-8">

                        {/* Contact Information */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${info.action ? 'cursor-pointer' : ''}`}
                                        onClick={info.action}
                                    >
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            {React.cloneElement(info.icon, { className: "text-xl text-blue-600" })}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{info.title}</p>
                                            <p className="text-gray-600">{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Me</h4>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <button
                                            key={index}
                                            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                                            className={`w-12 h-12 ${social.color} text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md`}
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;