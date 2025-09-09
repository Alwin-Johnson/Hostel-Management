import React from 'react';
import { 
  Utensils,
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  CreditCard
} from 'lucide-react';

interface Student {
  id: string;
  avatar: string;
  name: string;
  studentId: string;
  roomNo: string;
  block: string;
  admissionDate: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
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
  status: 'paid' | 'pending' | 'overdue';
}

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

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
        case 'overdue':
          return `${baseClasses} bg-red-100 text-red-700`;
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
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student List</span>
      </button>

      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-700">{student.avatar}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-gray-500">Student ID: {student.studentId}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
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
                <label className="block text-sm text-gray-500 mb-1">Block</label>
                <p className="font-medium text-gray-900">{student.block}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Room Number</label>
                <p className="font-medium text-gray-900">{student.roomNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mess Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Utensils className="w-5 h-5 mr-2" />
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Mess Calendar
        </h2>
        <MessCalendar />
      </div>

      {/* Fee History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
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