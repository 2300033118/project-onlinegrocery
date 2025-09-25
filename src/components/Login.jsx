
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = Math.random() * 60 + 20;
      const posX = Math.random() * window.innerWidth;
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 10;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${posX}px`;
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.animationDuration = `${duration}s`;

      document.querySelector('.login-background').appendChild(bubble);
      setTimeout(() => bubble.remove(), duration * 1000);
    };

    const bubbleInterval = setInterval(createBubble, 800);
    return () => clearInterval(bubbleInterval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:8084/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store token + user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile");

        navigate('/home');
      } else {
        setMessage(data.message || 'Login failed');
        setIsError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
      setIsError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className={`login-container ${shake ? 'shake' : ''}`}>
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <>Logging in...</> : 'Login'}
          </button>

          <div className="login-options">
            <Link to="/adminlogin">Admin Login</Link>
            <span className="divider">|</span>
            <a href="/signup" className="signup-link">Create Account</a>
          </div>
        </form>

        {message && <div className={`message ${isError ? 'error' : 'success'}`}>{message}</div>}
      </div>

      <div className="footers">
        <p className="legal-text">ALL RIGHTS RESERVED © Online grocery Store</p>
      </div>
    </div>
  );
};

export default Login;
