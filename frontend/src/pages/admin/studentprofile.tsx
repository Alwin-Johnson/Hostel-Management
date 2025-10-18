import React, { useState } from 'react';
import { 
  Utensils,
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface MessHistoryRecord {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  cost: number;
}

interface Student {
  messHistory: MessHistoryRecord[];
  id: string;
  avatar: string;
  name: string;
  studentId: string;
  roomNo: string;
  block: string;
  admissionDate: string;
  feeStatus: 'paid' | 'pending';
  dueAmount: number;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  mailingAddress?: string;
  feeHistory?: FeeRecord[];
}

interface FeeRecord {
  invoiceId: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
}

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

const MessCalendar: React.FC<{ messHistory: MessHistoryRecord[] }> = ({ messHistory }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getMessRecord = (year: number, month: number, day: number) => {
    const dateKey = formatDateKey(year, month, day);
    return messHistory.find(record => record.date === dateKey);
  };

  const getSkippedMealBackground = (messRecord: MessHistoryRecord | undefined) => {
    if (!messRecord) return 'bg-white';
    
    const skippedMeals = [];
    if (!messRecord.breakfast) skippedMeals.push('breakfast');
    if (!messRecord.lunch) skippedMeals.push('lunch');
    if (!messRecord.dinner) skippedMeals.push('dinner');
    
    if (skippedMeals.length === 0) return 'bg-white';
    
    // Multiple meals skipped
    if (skippedMeals.length === 3) return 'bg-red-500';
    if (skippedMeals.length === 2) return 'bg-purple-500';
    
    // Single meal skipped - bright, distinct colors
    if (skippedMeals.includes('breakfast')) return 'bg-emerald-500';
    if (skippedMeals.includes('lunch')) return 'bg-amber-500';
    if (skippedMeals.includes('dinner')) return 'bg-blue-500';
    
    return 'bg-white';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-16"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const messRecord = getMessRecord(year, month, day);
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const backgroundClass = getSkippedMealBackground(messRecord);

      days.push(
        <div
          key={day}
          className={`h-16 border border-gray-300 p-2 ${backgroundClass} ${
            isToday ? 'ring-2 ring-indigo-600' : ''
          }`}
        >
          <div className={`text-sm font-bold mb-1 ${
            backgroundClass === 'bg-white' ? 'text-gray-900' : 'text-white'
          }`}>
            {day}
          </div>
          {messRecord && (
            <div className={`text-xs font-bold ${
              backgroundClass === 'bg-white' ? 'text-gray-800' : 'text-white'
            }`}>
              ₹{messRecord.cost}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-base">Skipped Meals (Background Color)</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-emerald-500 border border-gray-400 rounded"></div>
            <span className="text-gray-700 font-medium">Breakfast skipped</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-amber-500 border border-gray-400 rounded"></div>
            <span className="text-gray-700 font-medium">Lunch skipped</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-blue-500 border border-gray-400 rounded"></div>
            <span className="text-gray-700 font-medium">Dinner skipped</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-purple-500 border border-gray-400 rounded"></div>
            <span className="text-gray-700 font-medium">2 meals skipped</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 bg-red-500 border border-gray-400 rounded"></div>
            <span className="text-gray-700 font-medium">All meals skipped</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-semibold text-gray-600 bg-gray-100">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusClasses = () => {
      const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
      
      switch (status) {
        case 'paid':
          return `${baseClasses} bg-green-100 text-green-700`;
        case 'pending':
          return `${baseClasses} bg-yellow-100 text-yellow-700`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-700`;
      }
    };

    return (
      <span className={getStatusClasses()}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-white/60 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Student List</span>
          </button>
        </div>

        {/* Header Section - Enhanced */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
              <span className="text-3xl font-bold text-white">{student.avatar}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{student.name}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-gray-600 font-medium">ID: {student.studentId}</p>
                <span className="text-gray-300">|</span>
                <p className="text-gray-600 font-medium">Room {student.roomNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <p className="font-medium text-gray-900">{student.name}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                <p className="font-medium text-gray-900">
                  {student.dateOfBirth ? formatDate(student.dateOfBirth) : 'Not provided'}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Gender</label>
                <p className="font-medium text-gray-900">{student.gender || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Address</label>
              <p className="font-medium text-gray-900 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {student.email || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
              <p className="font-medium text-gray-900 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {student.phone || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Mailing Address</label>
              <p className="font-medium text-gray-900 flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                {student.mailingAddress || 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            Academic Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Admission Date</label>
                <p className="font-medium text-gray-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {formatDate(student.admissionDate)}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Room Number</label>
                <p className="font-medium text-gray-900">{student.roomNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mess Details */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <Utensils className="w-5 h-5 text-orange-600" />
            </div>
            Mess Details
          </h2>
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {student.messHistory?.filter(record => record.breakfast).length || 0}
                </div>
                <div className="text-xs text-gray-500">Breakfasts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {student.messHistory?.filter(record => record.lunch).length || 0}
                </div>
                <div className="text-xs text-gray-500">Lunches</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {student.messHistory?.filter(record => record.dinner).length || 0}
                </div>
                <div className="text-xs text-gray-500">Dinners</div>
              </div>
            </div>
            
            {/* Total Cost */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Monthly Mess Cost</div>
              <div className="text-xl font-bold text-blue-900">
                {formatCurrency(student.messHistory?.reduce((total, record) => total + record.cost, 0) || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mess Calendar - Full Width */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          Mess Calendar
        </h2>
        <MessCalendar messHistory={student.messHistory || []} />
      </div>

      {/* Fee History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
            <CreditCard className="w-5 h-5 text-teal-600" />
          </div>
          Fee History
        </h2>
        <div className="space-y-3">
          {student.feeHistory && student.feeHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500 font-medium">Invoice ID</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-medium">Date</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-medium">Amount</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {student.feeHistory.map((fee) => (
                    <tr key={fee.invoiceId}>
                      <td className="px-3 py-2 font-medium text-gray-900">{fee.invoiceId}</td>
                      <td className="px-3 py-2 text-gray-600">{formatDate(fee.date)}</td>
                      <td className="px-3 py-2 font-medium text-gray-900">{formatCurrency(fee.amount)}</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={fee.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No fee history available</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default StudentProfile;