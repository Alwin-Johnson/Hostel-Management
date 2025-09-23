// src/pages/student/NewAdmission.tsx
import React, { useState } from 'react';
import { Button } from '../../components/student/button';
import { Input } from '../../components/student/input';
import { Label } from '../../components/student/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/student/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/student/select';
import { Textarea } from '../../components/student/textarea';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

interface NewAdmissionProps {
  onPageChange?: (page: string) => void;
}

export const NewAdmission: React.FC<NewAdmissionProps> = ({ onPageChange }) => {
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    course: '',
    year: '',
    rollNumber: '',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    emergencyContact: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    roomPreference: '',
    messType: '',
    medicalInfo: '',
    previousHostel: ''
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicationData.firstName && applicationData.email && applicationData.phone) {
      toast.success('Application submitted successfully! We will inform you soon about your status.');
      setTimeout(() => onPageChange && onPageChange('landing'), 2000);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    

      <div className="max-w-4xl mx-auto py-10 px-6">
        <Card className="bg-white/95 backdrop-blur-lg shadow-xl border border-gray-100 rounded-3xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">New Admission Application</CardTitle>
            <p className="text-gray-600 text-lg">Fill out the form below to apply for hostel admission</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleApplicationSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg border-b pb-2">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={applicationData.firstName}
                      onChange={(e) => setApplicationData({ ...applicationData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={applicationData.lastName}
                      onChange={(e) => setApplicationData({ ...applicationData, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={applicationData.dateOfBirth}
                      onChange={(e) => setApplicationData({ ...applicationData, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => setApplicationData({ ...applicationData, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h4 className="text-lg border-b pb-2">Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course/Program</Label>
                    <Select onValueChange={(value) => setApplicationData({ ...applicationData, course: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech">B.Tech</SelectItem>
                        <SelectItem value="mtech">M.Tech</SelectItem>
                        <SelectItem value="bba">BBA</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="mca">MCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year</Label>
                    <Select onValueChange={(value) => setApplicationData({ ...applicationData, year: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="rollNumber">Roll Number (if available)</Label>
                    <Input
                      id="rollNumber"
                      type="text"
                      placeholder="Enter roll number"
                      value={applicationData.rollNumber}
                      onChange={(e) => setApplicationData({ ...applicationData, rollNumber: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="space-y-4">
                <h4 className="text-lg border-b pb-2">Family Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      type="text"
                      placeholder="Enter father's name"
                      value={applicationData.fatherName}
                      onChange={(e) => setApplicationData({ ...applicationData, fatherName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      type="text"
                      placeholder="Enter mother's name"
                      value={applicationData.motherName}
                      onChange={(e) => setApplicationData({ ...applicationData, motherName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone">Guardian Phone</Label>
                    <Input
                      id="guardianPhone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={applicationData.guardianPhone}
                      onChange={(e) => setApplicationData({ ...applicationData, guardianPhone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={applicationData.emergencyContact}
                      onChange={(e) => setApplicationData({ ...applicationData, emergencyContact: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h4 className="text-lg border-b pb-2">Address Information</h4>
                <Textarea
                  id="address"
                  placeholder="Enter complete address"
                  value={applicationData.address}
                  onChange={(e) => setApplicationData({ ...applicationData, address: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={applicationData.city}
                    onChange={(e) => setApplicationData({ ...applicationData, city: e.target.value })}
                  />
                  <Input
                    id="state"
                    type="text"
                    placeholder="State"
                    value={applicationData.state}
                    onChange={(e) => setApplicationData({ ...applicationData, state: e.target.value })}
                  />
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Pincode"
                    value={applicationData.pincode}
                    onChange={(e) => setApplicationData({ ...applicationData, pincode: e.target.value })}
                  />
                </div>
              </div>

              {/* Hostel Preferences */}
              <div className="space-y-4">
                <h4 className="text-lg border-b pb-2">Hostel Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomPreference">Room Preference</Label>
                    <Select onValueChange={(value) => setApplicationData({ ...applicationData, roomPreference: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Room</SelectItem>
                        <SelectItem value="double">Double Sharing</SelectItem>
                        <SelectItem value="triple">Triple Sharing</SelectItem>
                        <SelectItem value="four">Four Sharing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messType">Mess Type Preference</Label>
                    <Select onValueChange={(value) => setApplicationData({ ...applicationData, messType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mess type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Textarea
                  id="medicalInfo"
                  placeholder="Medical Info (Optional)"
                  value={applicationData.medicalInfo}
                  onChange={(e) => setApplicationData({ ...applicationData, medicalInfo: e.target.value })}
                />
                <Textarea
                  id="previousHostel"
                  placeholder="Previous Hostel Experience (Optional)"
                  value={applicationData.previousHostel}
                  onChange={(e) => setApplicationData({ ...applicationData, previousHostel: e.target.value })}
                />
              </div>

              <div className="flex justify-center pt-6">
                <Button type="submit" className="w-full max-w-md h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Submit Application
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
  );
};
