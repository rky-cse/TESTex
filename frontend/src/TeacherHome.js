<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
=======

import React, { useState, useEffect } from 'react';
import SingleCorrectQuestionForm from './SingleCorrectQuestionForm';
>>>>>>> cf212c931528e3fffafe32a42aee6f5958f00ba7

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

<<<<<<< HEAD
      
=======
      {creatingMockTest && (
        <div>
          <label>
            Test Name:
            <input
              type="text"
              value={mockTestName}
              onChange={(e) => setMockTestName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Test Duration (in minutes):
            <input
              type="number"
              value={mockTestDuration}
              onChange={(e) => setMockTestDuration(e.target.value)}
            />
          </label>
          <br />

          <label>
            Question Type:
            <select
              value={selectedQuestionType}
              onChange={(e) => setSelectedQuestionType(e.target.value)}
            >
              <option value="">Select Question Type</option>
              <option value="singleCorrect">Single Correct</option>
              <option value="multipleCorrect">Multiple Correct</option>
              <option value="integer">Integer Type</option>
              <option value="decimal">Decimal Type</option>
            </select>
          </label>
          <br />

          {selectedQuestionType && renderQuestionForm()}

          <button onClick={createMockTest}>Create Mock Test</button>
        </div>
      )}
>>>>>>> cf212c931528e3fffafe32a42aee6f5958f00ba7
    </div>
  );
};

export default TeacherHome;
