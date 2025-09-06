import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronDown
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

// Sample student data
const studentsData: Student[] = [
  {
    id: 'ST001',
    avatar: 'AB',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);

  // Get unique blocks for filter dropdown
  const blocks = useMemo(() => {
    return Array.from(new Set(studentsData.map(student => student.block)));
  }, []);

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
  }, [searchTerm, selectedBlock, selectedStatus, sortConfig]);

  const handleAction = (action: string, student: Student) => {
    switch (action) {
      case 'view':
        console.log('View student:', student);
        break;
      case 'edit':
        console.log('Edit student:', student);
        break;
      case 'delete':
        console.log('Delete student:', student);
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
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Students Management</h2>
            <p className="text-gray-600">Manage student records and information</p>
          </div>
          
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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

          {/* Export Button */}
          <button className="flex items-center space-x-2 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
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