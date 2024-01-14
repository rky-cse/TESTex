import React, { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const DecimalTypeQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [answerMin, setAnswerMin] = useState('');
  const [answerMax, setAnswerMax] = useState('');
  const [positiveMarks, setPositiveMarks] = useState(1);
  const [negativeMarks, setNegativeMarks] = useState(0);

  const handleQuestionImageChange = (e) => {
    const file = e.target.files[0];
    setQuestionImage(file);
  };

  return (
    <div>
      <h3>Decimal Type Question</h3>

      {/* Question Input */}
      <TextField
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        multiline
        rows={4}
        label="Question"
        placeholder="Enter question"
      />
      <input type="file" accept="image/*" onChange={handleQuestionImageChange} />

      {/* Answer Input Fields (Range for Decimal Numbers) */}
      <TextField
        type="number"
        value={answerMin}
        onChange={(e) => setAnswerMin(e.target.value)}
        label="Answer (Min)"
      />
      <TextField
        type="number"
        value={answerMax}
        onChange={(e) => setAnswerMax(e.target.value)}
        label="Answer (Max)"
      />

      {/* Positive Marks Input Field */}
      <TextField
        type="number"
        value={positiveMarks}
        onChange={(e) => setPositiveMarks(e.target.value)}
        label="Positive Marks"
      />

      {/* Negative Marks Input Field */}
      <TextField
        type="number"
        value={negativeMarks}
        onChange={(e) => setNegativeMarks(e.target.value)}
        label="Negative Marks"
      />

      {/* Delete Question Icon */}
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  );
};

export default DecimalTypeQuestionForm;