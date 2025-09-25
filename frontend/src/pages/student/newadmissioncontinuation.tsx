// src/pages/student/AdmissionContinuation.tsx
import React, { useState } from 'react';
import { Button } from '../../components/student/button';
import { Input } from '../../components/student/input';
import { Label } from '../../components/student/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/student/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/student/select';
import { toast } from 'sonner';
import { Check, CreditCard, Building, User, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdmissionContinuationProps {
  onComplete?: () => void;
}

interface PaymentData {
  method: string;
  amount: number;
}

interface RoomData {
  roomNo: string;
  floor: string;
  type: string;
  monthlyRent: number;
  occupants: Array<{ name: string; course: string; year: string }>;
  maxOccupancy: number;
  block: string;
}

interface CredentialsData {
  studentId: string;
  password: string;
  confirmPassword: string;
}

const availableRooms = [
  // Single Rooms
  { 
    roomNo: 'A101', 
    floor: '1st Floor', 
    type: 'Single Room', 
    monthlyRent: 1000, 
    occupants: [],
    maxOccupancy: 1,
    block: 'Block A'
  },
  { 
    roomNo: 'A102', 
    floor: '1st Floor', 
    type: 'Single Room', 
    monthlyRent: 1000, 
    occupants: [],
    maxOccupancy: 1,
    block: 'Block A'
  },
  { 
    roomNo: 'B201', 
    floor: '2nd Floor', 
    type: 'Single Room', 
    monthlyRent: 1000, 
    occupants: [],
    maxOccupancy: 1,
    block: 'Block B'
  },

  // Double Sharing Rooms
  { 
    roomNo: 'A201', 
    floor: '2nd Floor', 
    type: 'Double Sharing', 
    monthlyRent: 667, 
    occupants: [
      { name: 'Rahul Sharma', course: 'B.Tech CSE', year: '2nd Year' }
    ],
    maxOccupancy: 2,
    block: 'Block A'
  },
  { 
    roomNo: 'A202', 
    floor: '2nd Floor', 
    type: 'Double Sharing', 
    monthlyRent: 667, 
    occupants: [],
    maxOccupancy: 2,
    block: 'Block A'
  },
  { 
    roomNo: 'B301', 
    floor: '3rd Floor', 
    type: 'Double Sharing', 
    monthlyRent: 667, 
    occupants: [
      { name: 'Priya Patel', course: 'B.Tech ECE', year: '3rd Year' }
    ],
    maxOccupancy: 2,
    block: 'Block B'
  },

  // Triple Sharing Rooms
  { 
    roomNo: 'C101', 
    floor: '1st Floor', 
    type: 'Triple Sharing', 
    monthlyRent: 500, 
    occupants: [
      { name: 'Amit Kumar', course: 'B.Tech ME', year: '1st Year' },
      { name: 'Suresh Gupta', course: 'B.Tech CE', year: '2nd Year' }
    ],
    maxOccupancy: 3,
    block: 'Block C'
  },
  { 
    roomNo: 'C102', 
    floor: '1st Floor', 
    type: 'Triple Sharing', 
    monthlyRent: 500, 
    occupants: [
      { name: 'Vikash Singh', course: 'B.Tech CSE', year: '1st Year' }
    ],
    maxOccupancy: 3,
    block: 'Block C'
  },

  // Four Sharing Rooms
  { 
    roomNo: 'D201', 
    floor: '2nd Floor', 
    type: 'Four Sharing', 
    monthlyRent: 417, 
    occupants: [
      { name: 'Ravi Verma', course: 'B.Tech EE', year: '2nd Year' },
      { name: 'Kiran Joshi', course: 'B.Tech CSE', year: '1st Year' },
      { name: 'Deepak Roy', course: 'B.Tech ME', year: '3rd Year' }
    ],
    maxOccupancy: 4,
    block: 'Block D'
  },
  { 
    roomNo: 'D202', 
    floor: '2nd Floor', 
    type: 'Four Sharing', 
    monthlyRent: 417, 
    occupants: [],
    maxOccupancy: 4,
    block: 'Block D'
  }
];

export const AdmissionContinuation: React.FC<AdmissionContinuationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [paymentData, setPaymentData] = useState<PaymentData>({ method: '', amount: 5000 });
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [credentials, setCredentials] = useState<CredentialsData>({
    studentId: `HST2025${Math.floor(1000 + Math.random() * 9000)}`,
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const steps = [
    { number: 1, title: 'Application Submitted', completed: true },
    { number: 2, title: 'Payment', completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, title: 'Room Selection', completed: currentStep > 3, active: currentStep === 3 },
    { number: 4, title: 'Account Setup', completed: currentStep > 4, active: currentStep === 4 }
  ];

  const validatePayment = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!paymentData.method) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRoomSelection = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedRoom) {
      newErrors.roomType = 'Please select a room';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCredentials = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(credentials.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!credentials.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (): Promise<void> => {
    if (!validatePayment()) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Payment successful! Proceeding to room selection.');
    setCurrentStep(3);
    setIsProcessing(false);
  };

  const handleRoomSelection = async (): Promise<void> => {
    if (!validateRoomSelection()) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Room allocated successfully!');
    setCurrentStep(4);
    setIsProcessing(false);
  };

  const handleCredentialsSetup = async (): Promise<void> => {
    if (!validateCredentials()) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      onComplete && onComplete();
    }, 2000);
    setIsProcessing(false);
  };

  const StepIndicator: React.FC = () => (
    <div className="flex items-center justify-center mb-8 px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              step.completed 
                ? 'bg-green-500 text-white' 
                : step.active 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <span className={`mt-2 text-xs font-medium ${
              step.active ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px mx-4 ${
              step.completed ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const PaymentStep: React.FC = () => (
    <Card className="bg-white shadow-xl rounded-3xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Admission Fee Payment</CardTitle>
        <p className="text-gray-600">Complete your payment to secure your admission</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Details</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Admission Fee</span>
              <span className="text-2xl font-bold text-blue-600">₹5,000</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-800">Select Payment Method</Label>
            <Select onValueChange={(value) => setPaymentData({...paymentData, method: value})}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="upi" className="text-gray-900 hover:bg-gray-100">UPI Payment</SelectItem>
                <SelectItem value="card" className="text-gray-900 hover:bg-gray-100">Credit/Debit Card</SelectItem>
                <SelectItem value="netbanking" className="text-gray-900 hover:bg-gray-100">Net Banking</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Pay ₹5,000</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const RoomSelectionStep: React.FC = () => (
    <Card className="bg-white shadow-xl rounded-3xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Room Allocation</CardTitle>
        <p className="text-gray-600">Select your preferred room based on availability and details</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          
          {/* Filter by Room Type */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={roomFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setRoomFilter('all')}
              className="rounded-full"
            >
              All Rooms
            </Button>
            {['Single Room', 'Double Sharing', 'Triple Sharing', 'Four Sharing'].map(type => (
              <Button 
                key={type}
                variant={roomFilter === type ? 'default' : 'outline'}
                onClick={() => setRoomFilter(type)}
                className="rounded-full text-sm"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRooms
              .filter(room => roomFilter === 'all' || room.type === roomFilter)
              .map((room) => (
              <div
                key={room.roomNo}
                onClick={() => setSelectedRoom(room)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedRoom?.roomNo === room.roomNo
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                {/* Room Header - Removed slots left */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{room.roomNo}</h3>
                    <p className="text-sm text-gray-600">{room.block} • {room.floor}</p>
                  </div>
                </div>

                {/* Room Type and Price */}
                <div className="mb-4">
                  <p className="text-lg font-semibold text-blue-600">{room.type}</p>
                  <p className="text-2xl font-bold text-gray-800">₹{room.monthlyRent}/month</p>
                </div>

                {/* Current Occupants */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Current Occupants ({room.occupants.length}/{room.maxOccupancy}):
                  </p>
                  {room.occupants.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No current occupants</p>
                  ) : (
                    <div className="space-y-2">
                      {room.occupants.map((occupant, index) => (
                        <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                          <p className="font-medium">{occupant.name}</p>
                          <p className="text-gray-600">{occupant.course} • {occupant.year}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {errors.roomType && (
            <p className="text-red-500 text-sm text-center">{errors.roomType}</p>
          )}

          <div className="flex space-x-4">
            <Button
              onClick={() => setCurrentStep(2)}
              variant="outline"
              className="flex-1 h-12 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleRoomSelection}
              disabled={isProcessing || !selectedRoom}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Allocating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Confirm Room {selectedRoom?.roomNo || 'Selection'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CredentialsStep: React.FC = () => (
    <Card className="bg-white shadow-xl rounded-3xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Account Setup</CardTitle>
        <p className="text-gray-600">Set up your student portal credentials</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Student ID</h3>
            <div className="text-2xl font-mono font-bold text-blue-600">{credentials.studentId}</div>
            <p className="text-sm text-gray-600 mt-2">Use this ID to login to your student portal</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Create Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password (min 8 characters)"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials(prev => ({...prev, password: e.target.value}));
                  if (errors.password) {
                    setErrors(prev => ({...prev, password: ''}));
                  }
                }}
                className={`h-12 rounded-xl transition-all duration-300 hover:shadow-lg focus:scale-105 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                required
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={credentials.confirmPassword}
                onChange={(e) => {
                  setCredentials(prev => ({...prev, confirmPassword: e.target.value}));
                  if (errors.confirmPassword) {
                    setErrors(prev => ({...prev, confirmPassword: ''}));
                  }
                }}
                className={`h-12 rounded-xl transition-all duration-300 hover:shadow-lg focus:scale-105 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                required
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => setCurrentStep(3)}
              variant="outline"
              className="flex-1 h-12 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleCredentialsSetup}
              disabled={isProcessing}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Complete Setup</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <style>
        {`
          .animate-slide-in {
            animation: slideIn 0.8s ease-out forwards;
          }
          
          @keyframes slideIn {
            0% { transform: translateY(30px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto px-6 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Complete Your Admission</h1>
          <p className="text-center text-gray-600">Follow the steps below to finalize your hostel admission</p>
        </div>
        
        <StepIndicator />
        
        <div className="animate-slide-in">
          {currentStep === 2 && <PaymentStep />}
          {currentStep === 3 && <RoomSelectionStep />}
          {currentStep === 4 && <CredentialsStep />}
        </div>
      </div>
    </>
  );
};
