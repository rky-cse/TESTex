// StudentHome.js
import './StudentHome.css'
import React from 'react';
// import { useNavigate } from 'react-router-dom';

const StudentHome = ({ userInfo }) => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
  
    // Redirect to the login page
    // navigate('/login');
    window.location.href = '/login';
  };
  

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Student</p>
      {/* Other content for the StudentHome page */}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentHome;