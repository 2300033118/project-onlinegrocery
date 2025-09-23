import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';
import Homepage from './Homepage';
import Prehome from './Prehome';
import About from './About';
import Registration from './Registration';

import ContactUs from './components/Contactus';
import Payment from './components/Payment';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Payment1 from './components/Payment1';
import AdminPortal from './components/AdminPortal';
import AdminLogin from './components/AdminLogin';
function ProtectedRoute({ children, role }) {
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));


  if (!token || !user) {
    return role === "ADMIN" ? <Navigate to="/adminlogin" /> : <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return role === "ADMIN" ? <Navigate to="/adminlogin" /> : <Navigate to="/login" />;
  }

  return children;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prehome />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path="/prehome" element={<Prehome />} /> 
        <Route path="/payment" element={<Payment1 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* 🔒 Protected Routes */}
        <Route path="/adminportal" element={
          <ProtectedRoute role="ADMIN">
            <AdminPortal />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute role="USER">
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
