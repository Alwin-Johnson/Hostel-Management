import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import Table, { TableColumn } from '../../components/admin/table';

interface Student {
  id: string;
  avatar: string;
  name: string;
  studentId: string;
  roomNo: string;
  block: string;
  admissionDate: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  payStatus: 'current' | 'pending' | 'overdue';
  email?: string;
  phone?: string;
}

interface NewStudentData {
  name: string;
  email: string;
  phone: string;
  roomNo: string;
  block: string;
  admissionDate: string;
}

// Sample student data
const initialStudentsData: Student[] = [
  {
    id: 'ST001',
    avatar: 'AK',
    name: 'Arun Kumar',
    studentId: 'ST20001',
    roomNo: 'A101',
    block: 'ADMIN BLOCK',
    admissionDate: '2023-01-15',
    feeStatus: 'paid',
    payStatus: 'current',
    email: 'arun.kumar@email.com',
    phone: '+91 9876543210'
  },
  {
    id: 'ST002', 
    avatar: 'PS',
    name: 'Priya Sharma',
    studentId: 'ST20002',
    roomNo: 'B205',
    block: 'SOUTH BLOCK',
    admissionDate: '2023-02-20',
    feeStatus: 'pending',
    payStatus: 'overdue',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211'
  },
  {
    id: 'ST003',
    avatar: 'RP',
    name: 'Raj Patel',
    studentId: 'ST20003', 
    roomNo: 'C301',
    block: 'NORTH BLOCK',
    admissionDate: '2023-01-10',
    feeStatus: 'paid',
    payStatus: 'current',
    email: 'raj.patel@email.com',
    phone: '+91 9876543212'
  },
  {
    id: 'ST004',
    avatar: 'SR',
    name: 'Sneha Reddy',
    studentId: 'ST20004',
    roomNo: 'A205',
    block: 'ADMIN BLOCK', 
    admissionDate: '2023-03-05',
    feeStatus: 'pending',
    payStatus: 'pending',
    email: 'sneha.reddy@email.com',
    phone: '+91 9876543213'
  },
  {
    id: 'ST005',
    avatar: 'VS',
    name: 'Vikram Singh',
    studentId: 'ST20005',
    roomNo: 'B101',
    block: 'SOUTH BLOCK',
    admissionDate: '2023-01-25',
    feeStatus: 'paid',
    payStatus: 'current',
    email: 'vikram.singh@email.com',
    phone: '+91 9876543214'
  },
  {
    id: 'ST006',
    avatar: 'AJ', 
    name: 'Anita Joshi',
    studentId: 'ST20006',
    roomNo: 'C205',
    block: 'NORTH BLOCK',
    admissionDate: '2023-02-15',
    feeStatus: 'overdue',
    payStatus: 'overdue',
    email: 'anita.joshi@email.com',
    phone: '+91 9876543215'
  }
];

// Notification Component
const Notification: React.FC<{
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  const getNotificationClasses = () => {
    const baseClasses = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80";
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-50 border border-green-200 text-green-800`;
      case 'error':
        return `${baseClasses} bg-red-50 border border-red-200 text-red-800`;
      case 'info':
        return `${baseClasses} bg-blue-50 border border-blue-200 text-blue-800`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className={getNotificationClasses()}>
      {getIcon()}
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Add Student Modal Component
const AddStudentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: NewStudentData) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<NewStudentData>({
    name: '',
    email: '',
    phone: '',
    roomNo: '',
    block: '',
    admissionDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Partial<NewStudentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blocks = ['ADMIN BLOCK', 'NORTH BLOCK', 'SOUTH BLOCK'];

  const validateForm = (): boolean => {
    const newErrors: Partial<NewStudentData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.roomNo.trim()) newErrors.roomNo = 'Room number is required';
    if (!formData.block) newErrors.block = 'Block is required';
    if (!formData.admissionDate) newErrors.admissionDate = 'Admission date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        roomNo: '',
        block: '',
        admissionDate: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleChange = (field: keyof NewStudentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Student</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter student's full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+91 9876543210"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                value={formData.roomNo}
                onChange={(e) => handleChange('roomNo', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.roomNo ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="A101"
              />
              {errors.roomNo && <p className="mt-1 text-sm text-red-600">{errors.roomNo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Block
              </label>
              <select
                value={formData.block}
                onChange={(e) => handleChange('block', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.block ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Block</option>
                {blocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
              {errors.block && <p className="mt-1 text-sm text-red-600">{errors.block}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admission Date
            </label>
            <input
              type="date"
              value={formData.admissionDate}
              onChange={(e) => handleChange('admissionDate', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.admissionDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.admissionDate && <p className="mt-1 text-sm text-red-600">{errors.admissionDate}</p>}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Adding...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string; type: 'fee' | 'pay' }> = ({ status, type }) => {
  const getStatusClasses = () => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'paid':
      case 'current':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getStatusText = () => {
    if (type === 'fee') {
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
    return status === 'current' ? 'Current' : status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span className={getStatusClasses()}>
      {getStatusText()}
    </span>
  );
};

const ActionDropdown: React.FC<{ student: Student; onAction: (action: string, student: Student) => void }> = ({ 
  student, 
  onAction 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Eye, label: 'View Details', action: 'view' },
    { icon: Edit, label: 'Edit Student', action: 'edit' },
    { icon: Trash2, label: 'Delete Student', action: 'delete', danger: true }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.action}
                  onClick={() => {
                    onAction(action.action, student);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    action.danger ? 'text-red-600' : 'text-gray-700'
                  } first:rounded-t-lg last:rounded-b-lg`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Students: React.FC = () => {
  const [studentsData, setStudentsData] = useState<Student[]>(initialStudentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Get unique blocks for filter dropdown
  const blocks = useMemo(() => {
    return Array.from(new Set(studentsData.map(student => student.block)));
  }, [studentsData]);

  // Generate avatar from name
  const generateAvatar = (name: string): string => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  // Generate unique student ID
  const generateStudentId = (): string => {
    const maxId = studentsData.reduce((max, student) => {
      const num = parseInt(student.studentId.replace('ST', ''));
      return num > max ? num : max;
    }, 20000);
    return `ST${maxId + 1}`;
  };

  // Show notification
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handle add student
  const handleAddStudent = (newStudentData: NewStudentData) => {
    const newStudent: Student = {
      id: `ST${Date.now()}`,
      avatar: generateAvatar(newStudentData.name),
      name: newStudentData.name,
      studentId: generateStudentId(),
      roomNo: newStudentData.roomNo,
      block: newStudentData.block,
      admissionDate: newStudentData.admissionDate,
      feeStatus: 'pending',
      payStatus: 'pending',
      email: newStudentData.email,
      phone: newStudentData.phone
    };

    setStudentsData(prev => [newStudent, ...prev]);
    showNotification('success', `Student ${newStudentData.name} has been added successfully!`);
  };

  // Filter and search students
  const filteredStudents = useMemo(() => {
    let filtered = studentsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roomNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Block filter
    if (selectedBlock) {
      filtered = filtered.filter(student => student.block === selectedBlock);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(student => student.feeStatus === selectedStatus);
    }

    // Sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.column as keyof Student];
        const bValue = b[sortConfig.column as keyof Student];
        
        // Handle undefined values
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
        if (bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, selectedBlock, selectedStatus, sortConfig, studentsData]);

  const handleAction = (action: string, student: Student) => {
    switch (action) {
      case 'view':
        console.log('View student:', student);
        showNotification('info', `Viewing details for ${student.name}`);
        break;
      case 'edit':
        console.log('Edit student:', student);
        showNotification('info', `Edit functionality for ${student.name} coming soon`);
        break;
      case 'delete':
        console.log('Delete student:', student);
        showNotification('info', `Delete functionality for ${student.name} coming soon`);
        break;
    }
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSortConfig({ column, direction });
  };

  const columns: TableColumn<Student>[] = [
    {
      key: 'name',
      header: 'Student',
      sortable: true,
      render: (_, student) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-700">{student.avatar}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{student.name}</div>
            <div className="text-sm text-gray-500">{student.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'studentId',
      header: 'Student ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'roomNo',
      header: 'Room No/Block',
      render: (_, student) => (
        <div>
          <div className="font-medium">{student.roomNo}</div>
          <div className="text-sm text-gray-500">{student.block}</div>
        </div>
      )
    },
    {
      key: 'admissionDate',
      header: 'Admission Date',
      sortable: true,
      render: (value) => {
        const date = new Date(value);
        return (
          <span className="text-sm">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        );
      }
    },
    {
      key: 'feeStatus',
      header: 'Fee Status',
      render: (value) => <StatusBadge status={value} type="fee" />
    },
    {
      key: 'payStatus',
      header: 'Pay Status',
      render: (value) => <StatusBadge status={value} type="pay" />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (_, student) => (
        <ActionDropdown student={student} onAction={handleAction} />
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Students Management</h2>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add new student</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Name / Student ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {/* Block Filter */}
          <div className="relative">
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Block</option>
              {blocks.map(block => (
                <option key={block} value={block}>{block}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Fee Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {studentsData.length} students
        {selectedStudents.length > 0 && (
          <span className="ml-4 text-blue-600 font-medium">
            {selectedStudents.length} selected
          </span>
        )}
      </div>

      {/* Students Table */}
      <Table
        data={filteredStudents}
        columns={columns}
        selectable={true}
        onSelectionChange={setSelectedStudents}
        onSort={handleSort}
        hoverable={true}
        emptyMessage="No students found"
      />
    </div>
  );
};

export default Students;