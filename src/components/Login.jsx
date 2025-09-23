// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = ({ handleCloseModal, onLoginSuccess, setShowSignupModal }) => {
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // Input validation
//     if (!mobile.trim()) {
//       setIsLoading(false);
//       return setError('Mobile number is required');
//     }
//     if (!/^\d{10}$/.test(mobile)) {
//       setIsLoading(false);
//       return setError('A valid 10-digit mobile number is required');
//     }
//     if (!password.trim()) {
//       setIsLoading(false);
//       return setError('Password is required');
//     }

//     try {
//       const response = await axios.post('http://localhost:8084/api/auth/login', {
//         mobile: mobile.trim(),
//         password: password.trim(),
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       // Handle successful login
//       if (response.status === 200) {
//         const { mobile, name, email, message } = response.data;
//         console.log('Login successful:', { mobile, name, email, message });

//         // Store user details in localStorage (optional)
//         localStorage.setItem('userMobile', mobile);
//         localStorage.setItem('userName', name);
//         localStorage.setItem('userEmail', email);

//         onLoginSuccess();
//         handleCloseModal();
//       }
//     } catch (err) {
//       let message = 'Login failed. Please try again.';
//       if (err.response) {
//         message = err.response.data?.message || message;
//       } else if (err.request) {
//         message = 'Network error. Please check your connection.';
//       }
//       setError(message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close-button" onClick={handleCloseModal}>
//           &times;
//         </span>
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleLoginSubmit}>
//           <input
//             type="tel"
//             placeholder="Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
//             pattern="[0-9]{10}"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             minLength="6"
//             required
//           />
//           <button 
//             type="submit" 
//             className="modal-button"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <p className="signup-prompt">
//           Don't have an account?{' '}
//           <button
//             className="signup-link"
//             onClick={() => {
//               handleCloseModal();
//               setShowSignupModal(true);
//             }}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';

// const Login = () => {
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [userDetails, setUserDetails] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const requestBody = { mobile, password };

//     try {
//       const response = await fetch('http://localhost:8084/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserDetails(data);
//         setMessage(data.message);
//       } else {
//         setMessage(data.message || 'Login failed');
//       }
//     } catch (error) {
//       setMessage('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Mobile Number:</label><br />
//           <input
//             type="text"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginTop: '10px' }}>
//           <label>Password:</label><br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" style={{ marginTop: '15px' }}>Login</button>
//       </form>

//       {message && (
//         <div style={{ marginTop: '20px', color: 'blue' }}>
//           <strong>{message}</strong>
//         </div>
//       )}

//       {userDetails && (
//         <div style={{ marginTop: '10px' }}>
//           <p><strong>Name:</strong> {userDetails.name}</p>
//           <p><strong>Email:</strong> {userDetails.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Login = () => {
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const requestBody = { mobile, password };

//     try {
//       const response = await fetch('http://localhost:8084/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserDetails(data);
//         localStorage.setItem('userMobile', data.mobile);
//         localStorage.setItem('userName', data.name);
//         localStorage.setItem('userEmail', data.email);

//         // Redirect to Homepage.jsx
//         navigate('/home'); // Make sure your routes have a /homepage path
//       } else {
//         setMessage(data.message || 'Login failed');
//       }
//     } catch (error) {
//       setMessage('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Mobile Number:</label><br />
//           <input
//             type="text"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginTop: '10px' }}>
//           <label>Password:</label><br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" style={{ marginTop: '15px' }}>Login</button>
//       </form>

//       {message && (
//         <div style={{ marginTop: '20px', color: 'red' }}>
//           <strong>{message}</strong>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // We'll create this CSS file

// const Login = () => {
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [shake, setShake] = useState(false);
//   const navigate = useNavigate();

//   // Add floating bubbles for background animation
//   useEffect(() => {
//     const createBubble = () => {
//       const bubble = document.createElement('div');
//       bubble.className = 'bubble';
      
//       // Random properties
//       const size = Math.random() * 60 + 20;
//       const posX = Math.random() * window.innerWidth;
//       const delay = Math.random() * 5;
//       const duration = Math.random() * 20 + 10;
      
//       bubble.style.width = `${size}px`;
//       bubble.style.height = `${size}px`;
//       bubble.style.left = `${posX}px`;
//       bubble.style.animationDelay = `${delay}s`;
//       bubble.style.animationDuration = `${duration}s`;
      
//       document.querySelector('.login-background').appendChild(bubble);
      
//       // Remove bubble after animation completes
//       setTimeout(() => {
//         bubble.remove();
//       }, duration * 1000);
//     };
    
//     // Create bubbles periodically
//     const bubbleInterval = setInterval(createBubble, 800);
    
//     return () => clearInterval(bubbleInterval);
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');
    
//     const requestBody = { mobile, password };

//     try {
//       const response = await fetch('http://localhost:8084/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('userMobile', data.mobile);
//         localStorage.setItem('userName', data.name);
//         localStorage.setItem('userEmail', data.email);
//         navigate('/home');
//       } else {
//         setMessage(data.message || 'Login failed');
//         setShake(true);
//         setTimeout(() => setShake(false), 500);
//       }
//     } catch (error) {
//       setMessage('Server error. Please try again later.');
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-background">
//       {/* Animated bubbles will be inserted here by JS */}
      
//       <div className={`login-container ${shake ? 'shake' : ''}`}>
//         <div className="login-header">
//           <h2>Welcome Back!</h2>
//           <p>Please login to continue</p>
//         </div>
        
//         <form onSubmit={handleLogin} className="login-form">
//           <div className="form-group">
//             <label htmlFor="mobile">Mobile Number</label>
//             <input
//               type="text"
//               id="mobile"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               required
//               className="input-field"
//             />
//             <div className="input-highlight"></div>
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="input-field"
//             />
//             <div className="input-highlight"></div>
//           </div>
          
//           <button 
//             type="submit" 
//             className="login-button"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="spinner"></span>
//                 Logging in...
//               </>
//             ) : (
//               'Login'
//             )}
//           </button>
          
//           <div className="login-options">
//             <a href="/forgot-password" className="forgot-password">
//               Forgot Password?
//             </a>
//             <span className="divider">|</span>
//             <a href="/signup" className="signup-link">
//               Create Account
//             </a>
//           </div>
//         </form>
        
//         {message && (
//           <div className={`message ${response?.ok ? 'success' : 'error'}`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;



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
        <p className="legal-text">ALL RIGHTS RESERVED © DINESH KARTHIK ALLA</p>
      </div>
    </div>
  );
};

export default Login;
