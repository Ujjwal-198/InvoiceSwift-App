import React from 'react';
import ServiceIllustration1 from '../assets/service1.svg'
import ServiceIllustration2 from '../assets/service2.svg'
import ServiceIllustration3 from '../assets/service3.svg'
import ServiceIllustration4 from '../assets/service4.svg'
import ServiceIllustration5 from '../assets/service5.svg'

const Services = () => {
    return (
        <div className='flex flex-col justify-center align-middle min-h-screen w-full p-10 md:px-25'>
            <div>
                <h1 className='text-4xl font-semibold text-center'>Our Services</h1>
            </div>
            <div className='flex flex-col gap-y-8 my-10'>
                {/* Services */}
                <div className='flex gap-x-5 align-middle justify-around items-center md:shadow-none shadow-xl bg-white rounded-2xl md:p-0 px-5 py-10'>
                    {/* Service 1 */}
                    <div className="hidden md:flex items-center justify-center bg-white p-10">
                        <img
                            src={ServiceIllustration1}
                            alt="Signup Illustration"
                            className="w-200 h-auto object-contain"
                        />
                    </div>
                    <div className='flex flex-col gap-y-3 px-10'>
                        <h1 className='font-semibold text-xl'>Instant Invoice Generation</h1>
                        <p className='text-gray-800'>"Create professional invoices effortlessly within seconds.
                            Our system allows you to generate fully formatted invoices by simply entering basic details — no design skills required. Once generated, you can download the invoice instantly as a PDF, even without creating an account. It’s the perfect solution for quick, one-time invoice needs."</p>
                    </div>
                </div>
                <div className='flex gap-x-5 align-middle justify-around items-center md:shadow-none shadow-xl bg-white rounded-2xl md:p-0 px-5 py-10'>
                    {/* Service 2 */}
                    <div className='flex flex-col gap-y-3 px-10'>
                        <h1 className='font-semibold text-xl'>Secure User Accounts</h1>
                        <p className='text-gray-800'>Registered users enjoy the added benefit of saving their invoices directly to their profiles.
                            Every saved invoice is securely stored and can be accessed anytime under your personal dashboard. This ensures that your important billing data remains organized, accessible, and protected for future reference.</p>
                    </div>
                    <div className="hidden md:flex items-center justify-center bg-white p-10">
                        <img
                            src={ServiceIllustration2}
                            alt="Signup Illustration"
                            className="w-200 h-auto object-contain"
                        />
                    </div>
                </div>
                <div className='flex gap-x-5 align-middle justify-around items-center md:shadow-none shadow-xl bg-white rounded-2xl md:p-0 px-5 py-10'>
                    {/* Service 3 */}
                    <div className="hidden md:flex items-center justify-center bg-white p-10">
                        <img
                            src={ServiceIllustration3}
                            alt="Signup Illustration"
                            className="w-200 h-auto object-contain"
                        />
                    </div>
                    <div className='flex flex-col gap-y-3 px-10'>
                        <h1 className='font-semibold text-xl'>Invoice Management Dashboard</h1>
                        <p className='text-gray-800'>Authenticated users can view all their saved invoices in a clean, intuitive dashboard.
                            The dashboard allows you to sort invoices by due date, due amount, or date of creation, making it easy to track pending payments and stay on top of financial deadlines.</p>
                    </div>

                </div>
                <div className='flex gap-x-5 align-middle justify-around items-center md:shadow-none shadow-xl bg-white rounded-2xl md:p-0 px-5 py-10'>
                    {/* Service 4 */}
                    <div className='flex flex-col gap-y-3 px-10'>
                        <h1 className='font-semibold text-xl'>View and Delete Invoices</h1>
                        <p className='text-gray-800'>Easily manage your invoices with flexible control options.
                            You can open any saved invoice for a detailed view or delete older invoices that are no longer needed. This helps maintain a clutter-free and organized workspace within your profile.</p>
                    </div>
                    <div className="hidden md:flex items-center justify-center bg-white p-10">
                        <img
                            src={ServiceIllustration4}
                            alt="Signup Illustration"
                            className="w-200 h-auto object-contain"
                        />
                    </div>
                </div>
                <div className='flex gap-x-5 align-middle justify-around items-center md:shadow-none shadow-xl bg-white rounded-2xl md:p-0 px-5 py-10'>
                    {/* Service 5 */}
                    <div className="hidden md:flex items-center justify-center bg-white p-10">
                        <img
                            src={ServiceIllustration5}
                            alt="Signup Illustration"
                            className="w-200 h-auto object-contain"
                        />
                    </div>
                    <div className='flex flex-col gap-y-3 px-10'>
                        <h1 className='font-semibold text-xl'>Smart and Simple User Experience</h1>
                        <p className='text-gray-800'>Our platform is built with simplicity and efficiency in mind.
                            Whether you’re a business owner, freelancer, or student, you can generate, save, and manage invoices without unnecessary complexity — all from one place, in just a few clicks.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Services;
