
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fallingItems, setFallingItems] = useState([]);

  useEffect(() => {
    const itemTypes = ['shopping-cart', 'shopping-cart', 'shopping-cart','shopping-cart','shopping-cart','shopping-cart','shopping-cart',
                        'shopping-cart','shopping-cart','shopping-cart','shopping-cart','shopping-cart','shopping-cart','shopping-cart','shopping-cart'];
    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
        left: `${Math.random() * 1000}vw`,
        animationDelay: `${Math.random() * 1}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
        size: `${30 + Math.random() * 40}px`
      });
    }
    setFallingItems(items);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8084/api/auth/signup', formData);
      setShowSuccessPopup(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        password: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="signup-component-background">
      {fallingItems.map((item, index) => (
        <div
          key={index}
          className={`falling-item ${item.type}`}
          style={{
            left: item.left,
            animationDelay: item.animationDelay,
            animationDuration: item.animationDuration,
            width: item.size,
            height: item.size
          }}
        />
      ))}
      
      <div className="signup-component-container">
        <div className="signup-header">
          <h1>Create Account</h1>
        </div>
        
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile number:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-control"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn">Register</button>

            <p className="legal-text">
              By continuing, you agree to our Conditions of Use and Privacy Notice.
            </p>
          </form>

          <div className="divider">
            <span>Already have an account?</span>
          </div>

          <div className="login-redirect">
            <Link to="/login">Sign in</Link>    
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-popup-content">
              <h3>Signup Successful! Go to Signin</h3>
              <p>Your account has been created successfully.</p>
              <button onClick={closePopup} className="popup-close-btn">OK</button>
            </div>
          </div>
        </div>
      )}
      <div className="footer">
        <p className="legal-text">
              ALL RIGHTS ARE UNDER RESERVED © ONLINEGROCERY
         
            </p>
      </div>
    </div>
  );
};

export default Signup;