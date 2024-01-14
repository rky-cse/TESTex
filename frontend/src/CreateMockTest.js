
// CreateMockTest.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateMockTest = () => {
  const [testName, setTestName] = useState('');
  const [duration, setDuration] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const navigate = useNavigate();

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
    checkNextButtonStatus(e.target.value, duration);
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse the input value as an integer
    setDuration(value);
    checkNextButtonStatus(testName, value);
  };

  const checkNextButtonStatus = (testName, duration) => {
    setIsNextEnabled(testName.trim() !== '' && !isNaN(duration) && duration > 0);
  };

  const handleNextClick = () => {
    navigate('/questions', { state: { testName, duration } });
  };

  return (
    <div>
      <h2>Create Mock Test</h2>

      <label>
        Test Name:
        <TextField
          type="text"
          value={testName}
          onChange={handleTestNameChange}
        />
      </label>
      <br />

      <label>
        Duration (in minutes):
        <TextField
          type="number" // Use number type for integer input
          value={duration}
          onChange={handleDurationChange}
        />
      </label>
      <br />

      {/* Render Next button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNextClick}
        disabled={!isNextEnabled}
      >
        Next
      </Button>
    </div>
  );
};

export default CreateMockTest;

