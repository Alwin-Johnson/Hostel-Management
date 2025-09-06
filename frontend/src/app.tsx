import React from 'react'
import  JSX from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Simple test component for now
function AdminLogin(): JSX.Element {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Admin Login</h1>
      <p>Hostel Management System - Admin Portal</p>
      <form style={{ marginTop: '20px' }}>
        <div>
          <input type="email" placeholder="Email" style={{ margin: '10px', padding: '10px' }} />
        </div>
        <div>
          <input type="password" placeholder="Password" style={{ margin: '10px', padding: '10px' }} />
        </div>
        <button type="submit" style={{ margin: '10px', padding: '10px 20px' }}>
          Login
        </button>
      </form>
    </div>
  )
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App