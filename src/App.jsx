import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Pages
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TrackIssues from './pages/TrackIssues';
import ReportIssue from './pages/ReportIssue';
import WardenDashboard from './pages/WardenDashboard';
import StaffDashboard from './pages/StaffDashboard';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

// Layout
import Layout from './components/Layout';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useApp();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { user } = useApp();

  const getDashboard = () => {
    switch (user?.role) {
      case 'student': return <StudentDashboard />;
      case 'warden': return <WardenDashboard />;
      case 'staff': return <StaffDashboard />;
      default: return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={getDashboard()} />
          <Route path="report" element={<ProtectedRoute allowedRoles={['student']}><ReportIssue /></ProtectedRoute>} />
          <Route path="track" element={<ProtectedRoute allowedRoles={['student', 'warden']}><TrackIssues /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
