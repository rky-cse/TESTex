
import './StudentHome.css';
import React, { useState ,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHome = ({ userInfo }) => {


const TestDetails=useRef('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
  
    // Redirect to the login page
    navigate('/login');
  };

  const addTestInStudent = async (testDetails) => {
    
    try {
      // Assuming you have an API endpoint to update the student's tests
      const response = await fetch('http://localhost:8000/api/addTestInStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: userInfo.username, // Replace with the actual student ID
          testDetails: testDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Student tests updated successfully');
      } else {
        console.error('Failed to update student tests:', data.error);
      }
    } catch (error) {
      console.error('Error updating student tests:', error);
    }
    
  };
  const fetchTestDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/getTest/${inputValue}`);
      const data = await response.json();

      if (data.success) {
        TestDetails.current=data.test;
      
      } else {
        console.error('Failed to fetch test details:', data.error);
      }
    } catch (error) {
      console.error('Error fetching test details:', error);
    }
  };




  const handleJoin = async() => {
    // Handle the join action with the inputValue
    if (inputValue.trim() !== '') {
      
      // Navigate to the test page with the joined test name
    await  fetchTestDetails();
    await addTestInStudent(TestDetails.current);
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
