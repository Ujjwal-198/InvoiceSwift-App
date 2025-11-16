import React from 'react';
import ServiceIllustration1 from '../assets/service1.svg';
import ServiceIllustration2 from '../assets/service2.svg';
import ServiceIllustration3 from '../assets/service3.svg';
import ServiceIllustration4 from '../assets/service4.svg';
import ServiceIllustration5 from '../assets/service5.svg';
import { FaFileInvoiceDollar, FaUserShield, FaChartLine, FaEye, FaRocket } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: <FaFileInvoiceDollar className="text-3xl text-blue-600" />,
            title: "Instant Invoice Generation",
            description: "Create professional invoices effortlessly within seconds. Our system allows you to generate fully formatted invoices by simply entering basic details — no design skills required. Once generated, you can download the invoice instantly as a PDF, even without creating an account.",
            image: ServiceIllustration1,
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: <FaUserShield className="text-3xl text-green-600" />,
            title: "Secure User Accounts",
            description: "Registered users enjoy the added benefit of saving their invoices directly to their profiles. Every saved invoice is securely stored and can be accessed anytime under your personal dashboard. This ensures that your important billing data remains organized, accessible, and protected.",
            image: ServiceIllustration2,
            gradient: "from-green-500 to-green-600"
        },
        {
            icon: <FaChartLine className="text-3xl text-purple-600" />,
            title: "Invoice Management Dashboard",
            description: "Authenticated users can view all their saved invoices in a clean, intuitive dashboard. The dashboard allows you to sort invoices by due date, due amount, or date of creation, making it easy to track pending payments and stay on top of financial deadlines.",
            image: ServiceIllustration3,
            gradient: "from-purple-500 to-purple-600"
        },
        {
            icon: <FaEye className="text-3xl text-orange-600" />,
            title: "View and Delete Invoices",
            description: "Easily manage your invoices with flexible control options. You can open any saved invoice for a detailed view or delete older invoices that are no longer needed. This helps maintain a clutter-free and organized workspace within your profile.",
            image: ServiceIllustration4,
            gradient: "from-orange-500 to-orange-600"
        },
        {
            icon: <FaRocket className="text-3xl text-indigo-600" />,
            title: "Smart and Simple User Experience",
            description: "Our platform is built with simplicity and efficiency in mind. Whether you're a business owner, freelancer, or student, you can generate, save, and manage invoices without unnecessary complexity — all from one place, in just a few clicks.",
            image: ServiceIllustration5,
            gradient: "from-indigo-500 to-indigo-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Streamline your invoicing process with our comprehensive suite of tools designed for modern businesses
                    </p>
                </div>
            </div>

            {/* Services Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                <div className="flex items-center space-x-4">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                                        {React.cloneElement(service.icon, { className: "text-3xl text-white" })}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className={`w-20 h-1 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                            </div>
                            
                            <div className={`flex justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-2xl opacity-20 transform rotate-6`}></div>
                                    <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full max-w-sm h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to streamline your invoicing?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of businesses already using InvoiceSwift to manage their billing efficiently
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg">
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Services;