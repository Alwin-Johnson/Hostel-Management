import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  DollarSign, 
  Utensils, 
  MessageSquare, 
  Search, 
  Bell, 
  User,
  ChevronDown,
  Camera,
  Upload,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';

const MessManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('mess');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'mess', label: 'Mess', icon: Utensils },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
  ];

  const isActive = (id: string) => activeTab === id;

  // Skipped meal stats
  const skippedMealStats = [
    { title: 'Skipped Breakfast', value: '25', bgColor: '#EF4444' },
    { title: 'Skipped Lunch', value: '18', bgColor: '#F59E0B' },
    { title: 'Skipped Dinner', value: '12', bgColor: '#10B981' }
  ];

  // Meal data with food items
  const meals = [
    {
      name: 'Breakfast',
      time: '7:00 AM - 9:00 AM',
      items: ['Idli (3 pieces)', 'Sambar', 'Coconut Chutney', 'Tea/Coffee'],
      image: null
    },
    {
      name: 'Lunch', 
      time: '12:00 PM - 2:00 PM',
      items: ['Rice', 'Dal Tadka', 'Mixed Vegetable', 'Pickle', 'Buttermilk'],
      image: null
    },
    {
      name: 'Dinner',
      time: '7:00 PM - 9:00 PM', 
      items: ['Chapati (3 pieces)', 'Rice', 'Paneer Curry', 'Dal', 'Salad'],
      image: null
    }
  ];

  // Student data
  const [studentsData] = useState([
    {
      id: 1,
      studentName: 'Raj Patel',
      breakfast: 'Yes',
      lunch: 'A-101',
      roomNoBlock: 'Lassi',
      mealSkipped: 'Available',
      messStatus: 'Available',
      actions: 'active'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      breakfast: 'FY MCA',
      lunch: 'B-205',
      roomNoBlock: 'Dinner',
      mealSkipped: 'Not Available',
      messStatus: 'Not Available', 
      actions: 'inactive'
    },
    {
      id: 3,
      studentName: 'Amit Kumar',
      breakfast: 'No',
      lunch: 'C-301',
      roomNoBlock: 'Lunch',
      mealSkipped: 'Available',
      messStatus: 'Available',
      actions: 'active'
    },
    {
      id: 4,
      studentName: 'Neha Singh',
      breakfast: 'Yes',
      lunch: 'A-205',
      roomNoBlock: 'Breakfast',
      mealSkipped: 'Not Available',
      messStatus: 'Available',
      actions: 'active'
    }
  ]);

  const filteredStudents = studentsData.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-gray-600 text-sm font-medium">Logo</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Mess Management</h1>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Right: Notifications and Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    active
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="p-6 space-y-6">
          {/* Skipped Meal Stats - 3 boxes in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skippedMealStats.map((stat, index) => (
              <div 
                key={index}
                className="rounded-xl p-6 shadow-lg relative overflow-hidden min-h-[120px] flex flex-col justify-between text-white"
                style={{ backgroundColor: stat.bgColor }}
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/5 rounded-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-sm font-medium text-white/80 mb-2">{stat.title}</h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Meal Cards Section - 3 smaller boxes with meal details */}
          <div className="grid grid-cols-3 gap-4">
            {meals.map((meal, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">{meal.name}</h3>
                  <p className="text-xs text-gray-500">{meal.time}</p>
                </div>

                {/* Image Upload Area */}
                <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-200">
                  {meal.image ? (
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-gray-500 text-xs">Upload meal image</p>
                    </div>
                  )}
                </div>
                
                {/* Food Items List */}
                <div className="p-3 flex-1 flex flex-col">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Menu Items:</h4>
                  <ul className="space-y-1 mb-3 flex-1">
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-1 text-xs text-gray-600">
                        <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Upload Menu Button */}
                  <button className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm mt-auto">
                    <Upload className="w-3 h-3" />
                    <span className="font-medium">Upload Menu</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Students Mess Management Table */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Student Details</h2>
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Filter */}
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Breakfast
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lunch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room No/Block
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meal Skipped
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mess Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium text-sm">
                              {student.studentName.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.studentName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.breakfast}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.lunch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.roomNoBlock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.mealSkipped === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.mealSkipped}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.messStatus === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.messStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            View More
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
                  <span className="font-medium">{studentsData.length}</span> results
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-300 text-sm rounded-md hover:bg-gray-100 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-sm rounded-md hover:bg-gray-100 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessManagement;