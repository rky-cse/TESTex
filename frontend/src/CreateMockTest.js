
import React, { useState } from 'react';
import AddQuestion from './AddQuestionPage';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const CreateMockTest = () => {
  const [testName, setTestName] = useState('');
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    // Logic to add a new question to the array
    const newQuestion = { /* your question object structure */ };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h2>Create Mock Test</h2>

      <label>
        Test Name:
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Duration (in minutes):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <br />

      {/* Render questions */}
      {questions.map((question, index) => (
        <div key={index}>
          {/* Render each question using the AddQuestion component */}
          <AddQuestion question={question} />

          {/* Delete Question Icon */}
          <IconButton onClick={() => handleDeleteQuestion(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}

      {/* Button to add a new question */}
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default CreateMockTest;
