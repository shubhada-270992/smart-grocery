import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Helper component for private routes
function PrivateRoute({ children }) {
  const token = localStorage.getItem('grocery_token');
  return token ? children : <Navigate to="/login" replace />;
}

// Helper component for public-only routes (like Login)
function PublicRoute({ children }) {
  const token = localStorage.getItem('grocery_token');
  return token ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Redirect any other path to /dashboard if logged in, else to /login */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </Router>
  );
}
