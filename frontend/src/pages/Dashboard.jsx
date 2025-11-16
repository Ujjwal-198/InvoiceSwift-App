import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar, FaEye, FaPlus, FaChartLine, FaClock, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);

  const quickActions = [
    {
      title: "Create New Invoice",
      description: "Generate a professional invoice in minutes",
      icon: <FaPlus className="text-2xl" />,
      action: () => navigate('/invoice'),
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "View My Invoices",
      description: "Manage and track all your invoices",
      icon: <FaEye className="text-2xl" />,
      action: () => navigate('/profile'),
      gradient: "from-green-500 to-green-600",
      hoverGradient: "hover:from-green-600 hover:to-green-700"
    }
  ];

  const stats = [
    {
      title: "Total Invoices",
      value: "12",
      icon: <FaFileInvoiceDollar className="text-2xl text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Pending Payments",
      value: "3",
      icon: <FaClock className="text-2xl text-orange-600" />,
      bgColor: "bg-orange-100"
    },
    {
      title: "Total Revenue",
      value: "₹45,000",
      icon: <FaDollarSign className="text-2xl text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "This Month",
      value: "₹12,500",
      icon: <FaChartLine className="text-2xl text-purple-600" />,
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user.name}!</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your invoices with ease and track your business growth
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
            >
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;