import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

// StatsCard component
interface StatsCardProps {
  title: string;
  value: string;
  bgColor: string;
  textColor?: string;
  icon?: React.ReactNode;
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  bgColor, 
  textColor = "white",
  icon,
  trend
}) => {
  return (
    <div 
      className={`rounded-xl p-6 shadow-lg relative overflow-hidden min-h-[120px] flex flex-col justify-between transition-transform hover:scale-105`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Decorative background shapes */}
      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/5 rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-sm font-medium text-${textColor}/80`}>
            {title}
          </h3>
          {icon && (
            <div className={`text-${textColor}/60`}>
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <p className={`text-2xl font-bold text-${textColor}`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center space-x-1">
              <TrendingUp className={`w-4 h-4 text-${textColor}/60`} />
              <span className={`text-xs text-${textColor}/60`}>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fee breakdown chart component
const FeeBreakdownChart: React.FC = () => {
  const data = [
    { label: 'Paid', value: 67, color: '#10B981' },
    { label: 'Pending', value: 18, color: '#F59E0B' },
    { label: 'Overdue', value: 15, color: '#EF4444' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h3>
      
      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            
            {/* Data segments */}
            {data.map((item, index) => {
              const circumference = 2 * Math.PI * 40;
              const percentage = item.value / total;
              const strokeDasharray = `${percentage * circumference} ${circumference}`;
              
              const prevPercentages = data.slice(0, index).reduce((sum, prev) => sum + prev.value / total, 0);
              const strokeDashoffset = -prevPercentages * circumference;
              
              return (
                <circle
                  key={item.label}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{total}%</span>
            <span className="text-sm text-gray-500">Total</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Fees component
const Fees: React.FC = () => {
  const [students] = useState([
    {
      id: 1,
      name: "Aditi Sharma",
      roomNo: "A-102",
      amount: 430,
      validity: 180,
      status: "paid"
    },
    {
      id: 2,
      name: "Rahul Singh",
      roomNo: "B-205",
      amount: 72000,
      validity: 8.40,
      status: "pending"
    },
    {
      id: 3,
      name: "Priya Patel",
      roomNo: "C-301",
      amount: 6000,
      validity: null,
      status: "overdue"
    },
    {
      id: 4,
      name: "Amit Kumar",
      roomNo: "A-105",
      amount: 5.5,
      validity: null,
      status: "overdue"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}k`;
    }
    return `₹${amount}`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard title="Total Collected" value="₹5,80,000" bgColor="#10B981" icon={<CheckCircle className="w-5 h-5" />} trend="↗" />
        <StatsCard title="Pending Fees" value="₹1,20,000" bgColor="#F59E0B" icon={<AlertTriangle className="w-5 h-5" />} trend="↓" />
        <StatsCard title="Overdue Fees" value="₹45,000" bgColor="#EF4444" icon={<AlertTriangle className="w-5 h-5" />} trend="!" />
        <StatsCard title="Collection %" value="82%" bgColor="#3B82F6" icon={<TrendingUp className="w-5 h-5" />} />
        <StatsCard title="Students with Pending Fees" value="180" bgColor="#6B7280" icon={<Users className="w-5 h-5" />} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pending Students List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roomNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{formatAmount(student.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.validity || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(student.status)}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side Charts */}
        <div className="space-y-6">
          <FeeBreakdownChart />
        </div>
      </div>
    </div>
  );
};

export default Fees;
