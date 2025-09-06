// src/routes/appRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/adminlayout';
import Dashboard from '../pages/admin/dashboard';
import Students from '../pages/admin/student';
import Fees from '../pages/admin/fees';
import Mess from '../pages/admin/mess';

// Simple test components for now
const AdminComplaints: React.FC = (): JSX.Element => {
  return <div>Complaints Content Coming Soon...</div>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/admin/dashboard" 
        element={
          <AdminLayout pageTitle="Dashboard">
            <Dashboard />
          </AdminLayout>
        } 
      />
      <Route 
        path="/admin/students" 
        element={
          <AdminLayout pageTitle="Students Management">
            <Students />
          </AdminLayout>
        } 
      />
      <Route 
        path="/admin/fees" 
        element={
          <AdminLayout pageTitle="Fees Management">
            <Fees />
          </AdminLayout>
        } 
      />
      <Route 
        path="/admin/mess" 
        element={
          <AdminLayout pageTitle="Mess Management">
            <Mess />
          </AdminLayout>
        } 
      />
      <Route 
        path="/admin/complaints" 
        element={
          <AdminLayout pageTitle="Complaints">
            <AdminComplaints />
          </AdminLayout>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to="/admin/dashboard" replace />} 
      />
    </Routes>
  );
};

export default AppRoutes;