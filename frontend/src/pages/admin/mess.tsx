import React, { useState } from 'react';
import { 
  Camera,
  Upload,
  Trash2,
  Filter,
  Search
} from 'lucide-react';

const Mess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealImages, setMealImages] = useState({
    breakfast: null,
    lunch: null,
    dinner: null
  });

  // Skipped meal stats
  const skippedMealStats = [
    { title: 'Skipped Breakfast', value: '25', bgColor: '#EF4444' },
    { title: 'Skipped Lunch', value: '18', bgColor: '#F59E0B' },
    { title: 'Skipped Dinner', value: '12', bgColor: '#10B981' }
  ];

  // Meal data with food items
  const meals = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '7:00 AM - 9:00 AM',
      items: ['Idli (3 pieces)', 'Sambar', 'Coconut Chutney', 'Tea', 'Coffee'],
    },
    {
      id: 'lunch',
      name: 'Lunch', 
      time: '12:00 PM - 2:00 PM',
      items: ['Rice', 'Dal Tadka', 'Mixed Vegetable', 'Pickle', 'Buttermilk'],
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:00 PM - 9:00 PM', 
      items: ['Chapati (3 pieces)', 'Rice', 'Paneer Curry', 'Dal', 'Salad'],
    }
  ];

  // Student data
  const [studentsData] = useState([
    {
      id: 1,
      studentName: 'Raj Patel',
      breakfast: 'Yes',
      lunch: 'Yes',
      dinner: 'No',
      roomNoBlock: 'A-101',
      mealSkipped: 'Available',
      messStatus: 'Available',
      actions: 'active'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      breakfast: 'No',
      lunch: 'Yes',
      dinner: 'Yes',
      roomNoBlock: 'B-205',
      mealSkipped: 'Not Available',
      messStatus: 'Not Available', 
      actions: 'inactive'
    },
    {
      id: 3,
      studentName: 'Amit Kumar',
      breakfast: 'Yes',
      lunch: 'No',
      dinner: 'Yes',
      roomNoBlock: 'C-301',
      mealSkipped: 'Available',
      messStatus: 'Available',
      actions: 'active'
    },
    {
      id: 4,
      studentName: 'Neha Singh',
      breakfast: 'Yes',
      lunch: 'Yes',
      dinner: 'No',
      roomNoBlock: 'A-205',
      mealSkipped: 'Not Available',
      messStatus: 'Available',
      actions: 'active'
    },
    {
      id: 5,
      studentName: 'Rohit Gupta',
      breakfast: 'No',
      lunch: 'No',
      dinner: 'Yes',
      roomNoBlock: 'B-102',
      mealSkipped: 'Available',
      messStatus: 'Available',
      actions: 'active'
    },
    {
      id: 6,
      studentName: 'Sneha Reddy',
      breakfast: 'Yes',
      lunch: 'Yes',
      dinner: 'Yes',
      roomNoBlock: 'C-204',
      mealSkipped: 'Available',
      messStatus: 'Available',
      actions: 'active'
    }
  ]);

  const filteredStudents = studentsData.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file upload
  const handleFileUpload = (mealId, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMealImages(prev => ({
          ...prev,
          [mealId]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = (mealId) => {
    document.getElementById(`file-input-${mealId}`).click();
  };

  return (
    <div className="space-y-6">
      {/* Combined Skipped Stats and Meal Cards - 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {meals.map((meal, index) => (
          <div key={index} className="space-y-4">
            {/* Skipped Meal Stat - positioned above each meal card */}
            <div 
              className="rounded-xl p-6 shadow-lg relative overflow-hidden min-h-[120px] flex flex-col justify-between text-white transition-transform hover:scale-105"
              style={{ backgroundColor: skippedMealStats[index].bgColor }}
            >
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/5 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white/80">{skippedMealStats[index].title}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-white">{skippedMealStats[index].value}</p>
                </div>
              </div>
            </div>

            {/* Meal Card - positioned below the corresponding skipped stat */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
                <p className="text-sm text-gray-500">{meal.time}</p>
              </div>

              {/* Image Upload Area */}
              <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-200 relative">
                {mealImages[meal.id] ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={mealImages[meal.id]} 
                      alt={meal.name} 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      onClick={() => setMealImages(prev => ({ ...prev, [meal.id]: null }))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center cursor-pointer p-4" onClick={() => triggerFileInput(meal.id)}>
                    <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Upload meal image</p>
                  </div>
                )}
                
                {/* Hidden file input */}
                <input
                  id={`file-input-${meal.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(meal.id, e)}
                  className="hidden"
                />
              </div>
              
              {/* Food Items List */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Menu Items:</h4>
                <ul className="space-y-2 mb-4">
                  {meal.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Upload Menu Button */}
                <button 
                  onClick={() => triggerFileInput(meal.id)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Menu</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Students Mess Management Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Student Mess Details</h2>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
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
            <thead className="bg-gray-50">
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
                  Dinner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room No/Block
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
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {student.studentName.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.breakfast === 'Yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.breakfast}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.lunch === 'Yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.lunch}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.dinner === 'Yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.dinner}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.roomNoBlock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.messStatus === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.messStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
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
      </div>
    </div>
  );
};

export default Mess;