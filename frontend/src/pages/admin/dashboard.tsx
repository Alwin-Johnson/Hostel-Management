import React from 'react';
import StatsCard from '../../components/admin/statscard';
import LineChartCard from '../../components/admin/linechartcard';
import ListCard from '../../components/admin/listcard';

const Dashboard: React.FC = () => {
  // Mock data for stats cards
  const statsData = [
    {
      title: "Total Students",
      value: "#1E90FF",
      bgColor: "#4F46E5", // Blue gradient
    },
    {
      title: "Fee Collection %",
      value: "#28A745",
      bgColor: "#10B981", // Green gradient
    },
    {
      title: "Pending Fees",
      value: "#DC3545",
      bgColor: "#F59E0B", // Orange gradient
    },
    {
      title: "Active Complaints",
      value: "#FFC107",
      bgColor: "#EF4444", // Red gradient
    }
  ];

  // Mock data for recent admissions
  const recentAdmissions = [
    { label: "New Admissions", value: 2600, sublabel: "This month" },
    { label: "Pending Applications", value: 200, sublabel: "Awaiting approval" },
    { label: "Total Capacity", value: 500, sublabel: "Available rooms" },
    { label: "Occupancy Rate", value: 85, sublabel: "85% occupied" }
  ];

  // Mock data for recent complaints
  const recentComplaints = [
    { label: "Room Issues", value: 140, sublabel: "Maintenance" },
    { label: "Food Quality", value: 160, sublabel: "Mess complaints" },
    { label: "Internet", value: 100, sublabel: "Network issues" },
    { label: "Cleaning", value: 80, sublabel: "Housekeeping" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Line Chart - Takes up 8 columns on large screens */}
        <div className="lg:col-span-8">
          <LineChartCard title="Skipped Meals Trends" />
        </div>

        {/* Recent Admissions - Takes up 3 columns on large screens */}
        <div className="lg:col-span-3">
          <ListCard title="Recent Admissions" items={recentAdmissions} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Complaints */}
        <div>
          <ListCard title="Recent Complaints" items={recentComplaints} />
        </div>

        {/* Additional Stats or Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">98%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">450</p>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-600">Staff Members</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">4.8</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;