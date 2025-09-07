// src/routes/appRoutes.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/adminlayout';
import Dashboard from '../pages/admin/dashboard';
import Students from '../pages/admin/student';
import Fees from '../pages/admin/fees';
import Mess from '../pages/admin/mess';
import { AdminLogin } from '../pages/admin/login';
import LaunchingPage from '../pages/landing/home';

// Simple test component
const AdminComplaints: React.FC = () => <div>Complaints Content Coming Soon...</div>;

// Simple test component for Student portal
const StudentPortal: React.FC = () => <div>Student portal coming soon...</div>;


// Protected Route
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// AppRoutes
const AppRoutes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/'); // Go back to LaunchingPage
  };

  // Handles clicks from LaunchingPage cards
  const handlePageChange = (target: 'admin' | 'student') => {
    if (target === 'admin') navigate('/login'); // redirect admin
    if (target === 'student') navigate('/student'); // show message
  };


  // Login Wrapper for Admin
  const LoginWrapper: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const handleAdminLogin = () => {
      onLogin();
      navigate('/admin/dashboard');
    };
    return <AdminLogin onLogin={handleAdminLogin} onPageChange={() => navigate('/')} />;
  };

  return (
    <Routes>
      {/* Root - Launching Page */}
      <Route path="/" element={<LaunchingPage onPageChange={handlePageChange} />} />

      <Route path="/student" element={<StudentPortal />} />


      {/* Admin Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <LoginWrapper onLogin={handleLogin} />
          )
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout pageTitle="Dashboard" onLogout={handleLogout}>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout pageTitle="Students Management" onLogout={handleLogout}>
              <Students />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/fees"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout pageTitle="Fees Management" onLogout={handleLogout}>
              <Fees />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/mess"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout pageTitle="Mess Management" onLogout={handleLogout}>
              <Mess />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout pageTitle="Complaints" onLogout={handleLogout}>
              <AdminComplaints />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;