import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TeacherHome = ({ userInfo }) => {
  const [creatingMockTest, setCreatingMockTest] = useState(false);
  
  const handleLogout = () => {
    console.log('Logout button clicked');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const createMockTest = () => {
    setCreatingMockTest(true);
  };

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Teacher</p>

 

      <Link to="/createMockTest">
        <button>Create Mock Test</button>
      </Link>

      <button onClick={handleLogout}>Logout</button>

      
    </div>
  );
};

export default TeacherHome;
