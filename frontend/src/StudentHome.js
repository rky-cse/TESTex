
import './StudentHome.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHome = ({ userInfo }) => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
  
    // Redirect to the login page
    navigate('/login');
  };

  const handleJoin = () => {
    // Handle the join action with the inputValue
    if (inputValue.trim() !== '') {
      // Perform your logic for joining the test
      console.log(`Joining test: ${inputValue}`);

      // Navigate to the test page with the joined test name
      navigate(`/testpage/${inputValue}`);
    } else {
      // Display an error or inform the user that the input is empty
      console.error('Please enter a test');
    }
  };

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Student</p>

      {/* Input field for joining */}
      <label>
        Join Test:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button onClick={handleJoin}>Join</button>

      {/* Other content for the StudentHome page */}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentHome;
