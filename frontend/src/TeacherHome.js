// StudentHome.js
import "./TeacherHome.css"
import React from 'react';
// import { useNavigate } from 'react-router-dom';

const TeacherHome = ({ userInfo }) => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage or perform any other necessary logout logic
    console.log('Logout button clicked');
    localStorage.removeItem('token');

    // Redirect to the login page
    // navigate('/login');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Teacher</p>
  

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TeacherHome;
