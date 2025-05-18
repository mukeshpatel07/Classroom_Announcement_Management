import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentHome from './pages/StudentHome';
import TeacherHome from './pages/TeacherHome';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function AppRoutes() {
  const location = useLocation();

  const showHomeOnlyOnRoot = location.pathname === '/';

  return (
    <>
      <Navbar />
      
      {/* Show Home only on root route */}
      {showHomeOnlyOnRoot && <Home />}

      {/* Route-based page rendering */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/teacher-home" element={<TeacherHome />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
