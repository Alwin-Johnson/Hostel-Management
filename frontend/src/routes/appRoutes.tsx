// src/routes/appRoutes.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/adminlayout';
import Dashboard from '../pages/admin/dashboard';
import Students from '../pages/admin/student';
import Fees from '../pages/admin/fees';
import Mess from '../pages/admin/mess';
import { AdminLogin } from '../pages/admin/login';

// Simple test components for now
const AdminComplaints: React.FC = (): JSX.Element => {
  return <div>Complaints Content Coming Soon...</div>;
};

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isAuthenticated 
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Login Wrapper Component
const LoginWrapper: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/admin/dashboard');
  };

  const handlePageChange = (page: string) => {
    if (page === 'landing') {
      // Handle any landing page logic here
      console.log('Page change to landing requested');
    }
  };

  return (
    <AdminLogin 
      onLogin={handleLogin}
      onPageChange={handlePageChange}
    />
  );
};

const AppRoutes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {/* Login Route - Root path */}
      <Route 
        path="/" 
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

      {/* Catch all - redirect to root */}
      <Route 
        path="*" 
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;