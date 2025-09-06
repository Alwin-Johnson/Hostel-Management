import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/adminlayout';
import Dashboard from '../pages/admin/dashboard';
import Fees from '../pages/admin/fees'; // Import the new Fees component

// Simple test components for now
function AdminStudents(): JSX.Element {
  return <div>Students Content Coming Soon...</div>;
}

function AdminMess(): JSX.Element {
  return <div>Mess Content Coming Soon...</div>;
}

function AdminComplaints(): JSX.Element {
  return <div>Complaints Content Coming Soon...</div>;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={
        <AdminLayout pageTitle="Dashboard">
          <Dashboard />
        </AdminLayout>
      } />
      <Route path="/admin/students" element={
        <AdminLayout pageTitle="Students Management">
          <AdminStudents />
        </AdminLayout>
      } />
      <Route path="/admin/fees" element={
        <AdminLayout pageTitle="Fees Management">
          <Fees />
        </AdminLayout>
      } />
      <Route path="/admin/mess" element={
        <AdminLayout pageTitle="Mess Management">
          <AdminMess />
        </AdminLayout>
      } />
      <Route path="/admin/complaints" element={
        <AdminLayout pageTitle="Complaints">
          <AdminComplaints />
        </AdminLayout>
      } />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;