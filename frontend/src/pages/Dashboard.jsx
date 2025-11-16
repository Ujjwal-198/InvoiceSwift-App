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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
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

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <button 
              onClick={() => navigate('/profile')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaFileInvoiceDollar className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Invoice #INV-001 created</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <span className="text-sm font-medium text-green-600">₹5,000</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaDollarSign className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Payment received for Invoice #INV-002</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
              <span className="text-sm font-medium text-green-600">₹7,500</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Invoice #INV-003 is overdue</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
              <span className="text-sm font-medium text-orange-600">₹3,200</span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">💡 Pro Tip</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Set up automatic reminders for overdue invoices to improve your cash flow. 
              You can also create invoice templates to save time on recurring clients.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;