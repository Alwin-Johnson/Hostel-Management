import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/student/card';
import { Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/student/badge';

export function StudentAttendance() {
  const attendanceData = {
    totalDays: 30,
    present: 28,
    absent: 2,
    percentage: 93.3
  };

  const attendanceStatus = attendanceData.percentage >= 75 ? 'Excellent' : 'Needs Improvement';
  const attendanceColor = attendanceData.percentage >= 75 ? 'green' : 'yellow';

  return (
    <div className="space-y-6">
      {/* Attendance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{attendanceData.totalDays}</p>
          <p className="text-sm text-gray-600">Total Days</p>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{attendanceData.present}</p>
          <p className="text-sm text-gray-600">Present</p>
        </div>

        <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-200 shadow-sm hover:shadow-lg transition-all duration-300">
          <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{attendanceData.absent}</p>
          <p className="text-sm text-gray-600">Absent</p>
        </div>

        <div className="text-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-lg transition-all duration-300">
          <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{attendanceData.percentage}%</p>
          <p className="text-sm text-gray-600">Attendance</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
        <CardHeader>
          <CardTitle>Attendance Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                attendanceColor === 'green' ? 'bg-green-600' : 'bg-yellow-400'
              }`}
              style={{ width: `${attendanceData.percentage}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-700">
            Your attendance is <span className={`font-semibold text-${attendanceColor}-700`}>{attendanceStatus}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
