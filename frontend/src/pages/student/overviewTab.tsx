import { Card, CardHeader, CardTitle, CardContent } from '../../components/student/card';
import { User, Home, Users, CheckCircle, TrendingUp, Phone, Mail } from 'lucide-react';
import { Badge } from '../../components/student/badge';

export function OverviewTab() {
  const studentData = {
    name: 'Amit Sharma',
    rollNumber: 'H20201',
    phone: '+91 9876543210',
    email: 'amit.sharma@college.edu',
    room: 'A-101',
    block: 'Block A',
    floor: '1st Floor',
    capacity: 4,
    roommates: ['Priya Singh', 'Rajesh Kumar'],
  };

  const attendanceData = { percentage: 93.3 };

  return (
    <div className="space-y-6">
      {/* Student Info Card */}
      <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-blue-800">Student Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Full Name</p>
              <p className="font-bold text-gray-800">{studentData.name}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-600 font-medium mb-1">Roll Number</p>
              <p className="font-bold text-gray-800">{studentData.rollNumber}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-600 font-medium mb-1">Phone Number</p>
              <p className="flex items-center space-x-2 font-bold text-gray-800">
                <Phone className="w-4 h-4 text-purple-600" />
                <span>{studentData.phone}</span>
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <p className="text-sm text-orange-600 font-medium mb-1">Email Address</p>
              <p className="flex items-center space-x-2 font-bold text-gray-800">
                <Mail className="w-4 h-4 text-orange-600" />
                <span className="truncate">{studentData.email}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-green-800">Quick Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
            <span className="font-medium text-green-800">Attendance</span>
            <Badge className="bg-green-500 text-white shadow-lg">{attendanceData.percentage}%</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl">
            <span className="font-medium text-indigo-800">Room Occupancy</span>
            <Badge className="bg-indigo-500 text-white shadow-lg">{studentData.roommates.length + 1}/{studentData.capacity}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Room Details */}
      <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-purple-800">Room Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-purple-600 font-medium">Room Number</p>
              <p className="text-2xl font-bold text-purple-800">{studentData.room}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-blue-600 font-medium">Block & Floor</p>
              <p className="text-lg font-bold text-blue-800">{studentData.block}, {studentData.floor}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-green-600 font-medium">Capacity</p>
              <p className="text-lg font-bold text-green-800">{studentData.capacity} Students</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl border border-orange-200">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-orange-600 font-medium">Occupancy</p>
              <p className="text-lg font-bold text-orange-800">{studentData.roommates.length + 1}/{studentData.capacity}</p>
            </div>
          </div>

          {/* Roommates */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <p className="text-lg font-semibold text-purple-800 mb-4">Current Roommates</p>
            <div className="flex flex-wrap gap-3">
              {studentData.roommates.map((roommate, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-200 shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-purple-800">{roommate}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
