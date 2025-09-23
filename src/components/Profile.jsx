// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          setError('User not logged in or email not found in localStorage.');
          return;
        }

        const response = await axios.get(`http://localhost:8084/api/users/profile?email=${email}`);
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user profile.');
        console.error(err);
      }
    };

    fetchUserProfile();



  }, []);

  if (error) {
    return <div className="profile-container"><p className="error">{error}</p></div>;
  }

  if (!user) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-details">
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
 
};

export default Profile;
