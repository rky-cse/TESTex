
import React, { useState, useEffect } from 'react';
import SingleCorrectQuestionForm from './SingleCorrectQuestionForm';

const TeacherHome = ({ userInfo }) => {
  const [creatingMockTest, setCreatingMockTest] = useState(false);
  const [mockTestName, setMockTestName] = useState('');
  const [mockTestDuration, setMockTestDuration] = useState(0);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  // Load user information from localStorage on component mount
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      // Set user information from localStorage
      setMockTestName(storedUserInfo.mockTestName || '');
      setMockTestDuration(storedUserInfo.mockTestDuration || 0);
      setSelectedQuestionType(storedUserInfo.selectedQuestionType || null);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logout button clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo'); // Clear user information on logout
    window.location.href = '/login';
  };

  const createMockTest = () => {
    // Save user information to localStorage
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        mockTestName,
        mockTestDuration,
        selectedQuestionType,
      })
    );

    console.log({
      testName: mockTestName,
      testDuration: mockTestDuration,
      questionType: selectedQuestionType,
    });

    // Reset state after creating the mock test
    setCreatingMockTest(false);
    setMockTestName('');
    setMockTestDuration(0);
    setSelectedQuestionType(null);
  };

  const renderQuestionForm = () => {
    switch (selectedQuestionType) {
      case 'singleCorrect':
        return <SingleCorrectQuestionForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Teacher</p>

      <button onClick={() => setCreatingMockTest(true)}>Create Mock Test</button>

      <button onClick={handleLogout}>Logout</button>

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
    </div>
  );
};

export default TeacherHome;

