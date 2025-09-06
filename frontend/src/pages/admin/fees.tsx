import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  MoreHorizontal,
  Download,
  Filter
} from 'lucide-react';

const FeesManagement = () => {
  // Sample data for the pending students
  const [pendingStudents] = useState([
    {
      id: 1,
      name: 'Aditi Sharma',
      roomNo: 'A-102',
      roomType: 'A-100',
      hostelNo: 'F603',
      amount: 430,
      status: 'paid',
      visit: 160
    },
    {
      id: 2,
      name: 'Rahul Singh',
      roomNo: 'B-203',
      roomType: 'B-205',
      hostelNo: '₹22,000',
      amount: 8.40,
      status: 'pending',
      visit: null
    },
    {
      id: 3,
      name: 'Priya Patel',
      roomNo: 'C-203',
      roomType: 'C-301',
      hostelNo: '₹2,100 Overdue',
      amount: 8.000,
      status: 'overdue',
      visit: null
    },
    {
      id: 4,
      name: 'Amit Kumar',
      roomNo: 'A-105',
      roomType: 'A-105',
      hostelNo: 8.005,
      amount: 5.5,
      status: 'overdue',
      visit: null
    }
  ]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      paid: 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium',
      pending: 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium',
      overdue: 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium'
    };
    
    return (
      <span className={statusStyles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Total Collected */}
        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-medium opacity-90 mb-2">Total Collected</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">₹5,80,000</span>
              <TrendingUp className="w-5 h-5 opacity-80" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Pending Fees */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-medium opacity-90 mb-2">Pending Fees</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">₹1,20,000</span>
              <TrendingDown className="w-5 h-5 opacity-80" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Overdue Fees */}
        <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-medium opacity-90 mb-2">Overdue Fees</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">₹45,000</span>
              <span className="text-lg">!</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Collection % */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-medium opacity-90 mb-2">Collection %</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold">82%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm opacity-90">180</span>
            </div>
          </div>
        </div>

        {/* Students with Pending Fees */}
        <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-medium opacity-90 mb-2">Students with</h3>
            <h3 className="text-sm font-medium opacity-90 mb-3">Pending Fees</h3>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold">180</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Students List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Pending Students List</h2>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Room No.</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel No.</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">{student.roomNo}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">{student.roomType}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">{student.hostelNo}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">{student.amount}</div>
                      {student.visit && (
                        <div className="text-xs text-gray-500">{student.visit}</div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(student.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Charts */}
        <div className="space-y-6">
          {/* Paid Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Paid Chart</h3>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-sm text-gray-600">Paid</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span className="text-sm text-gray-600">Due</span>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-center space-x-3 h-32">
              <div className="flex flex-col items-center">
                <div className="w-8 h-24 bg-green-400 rounded-t"></div>
                <span className="text-xs text-gray-500 mt-2">Paid</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-16 bg-yellow-400 rounded-t"></div>
                <span className="text-xs text-gray-500 mt-2">Pending</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-12 bg-red-400 rounded-t"></div>
                <span className="text-xs text-gray-500 mt-2">Due</span>
              </div>
            </div>
          </div>

          {/* Fee Breakdown - Donut Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Fee Breakdown</h3>
            
            <div className="flex items-center justify-center mb-4">
              {/* Simple Donut Chart Representation */}
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Green segment (60%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#34d399"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="150.8 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Yellow segment (25%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#fbbf24"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="62.8 339.2"
                    strokeDashoffset="-150.8"
                  />
                  {/* Red segment (15%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f87171"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="37.7 364.3"
                    strokeDashoffset="-213.6"
                  />
                </svg>
              </div>
            </div>

            {/* Breakdown percentages */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-sm text-gray-600">Paid</span>
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span className="text-sm text-gray-600">Overdue</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesManagement;