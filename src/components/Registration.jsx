import React, { useState } from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';
const Registration = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE_URL = 'http://localhost:8084/api/auth';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    setError('');
    setSuccessMessage('');
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        mode: "cors",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json().catch(() => null);
      
      if (!response.ok) {
        throw new Error(data?.message || 'Registration failed. Please try again.');
      }
      
      setSuccessMessage(data?.message || 'Registration successful!');
      resetForm();
      setIsSignIn(true); // Switch to sign-in view after successful registration
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.message || 'Failed to connect to server. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: "POST",
        mode: "cors",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json().catch(() => null);
      
      if (!response.ok) {
        throw new Error(data?.message || 'Login failed. Please check your credentials.');
      }
      
      setSuccessMessage('Login successful!');
      // Here you would typically:
      // 1. Store the authentication token
      // 2. Redirect to dashboard
      // For now, we'll just show success message
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || 'Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`container ${isSignIn ? '' : 'sign-up-mode'}`}>
        {/* Messages Section */}
        <div className="messages-container">
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing...</p>
          </div>
        )}

        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="input-group">
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                required 
              />
              <label>Full Name</label>
            </div>
            <div className="input-group">
              <input 
                type="email"
                name="email" 
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required 
              />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input 
                type="password"
                name="password" 
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required 
              />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input 
                type="password"
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required 
              />
              <label>Confirm Password</label>
            </div>
            <button 
              type="submit" 
              className="auth-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="input-group">
              <input 
                type="email"
                name="email" 
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required 
              />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input 
                type="password"
                name="password" 
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required 
              />
              <label>Password</label>
            </div>
            <a href="#" className="forgot-password">Forgot your password?</a>
            <button onClick={() => window.location.href = '/home'}
              type="submit" 
              className="auth-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button 
                className="ghost auth-btn" 
                onClick={() => setIsSignIn(true)}
                disabled={isLoading}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button 
                className="ghost auth-btn" 
                onClick={() => setIsSignIn(false)}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;