
import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const SingleCorrectQuestionForm = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [options, setOptions] = useState([{ text: '', isCorrect: false, image: null }]);
  const [positiveMarks, setPositiveMarks] = useState(1);
  const [negativeMarks, setNegativeMarks] = useState(0);

  const handleAddOption = () => {
    setOptions([...options, { text: '', isCorrect: false, image: null }]);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleQuestionImageChange = (e) => {
    const file = e.target.files[0];
    setQuestionImage(file);
  };

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...options];

    // If the selected option is correct, unselect all other options
    if (key === 'isCorrect' && value) {
      updatedOptions.forEach((opt, i) => (i !== index ? (opt.isCorrect = false) : null));
    }

    updatedOptions[index][key] = value;
    setOptions(updatedOptions);
  };

  const handleSave = () => {
    // Create an object with all the input data
    const formData = {
      question,
      questionImage,
      options,
      positiveMarks,
      negativeMarks,
    };

    // Call the onSave prop with the form data
    onSave && onSave(formData);
    console.log(formData);
  };

  return (
    <div>
      <h3>Single Correct Question</h3>

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

      {/* Options */}
      {options.map((option, index) => (
        <div key={index}>
          <TextField
            value={option.text}
            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
            placeholder={`Option ${index + 1}`}
          />

          <RadioGroup>
            <FormControlLabel
              value="correct"
              control={<Radio checked={option.isCorrect} onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)} />}
              label="Correct"
            />
          </RadioGroup>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleOptionChange(index, 'image', e.target.files[0])}
          />

          {/* Delete Option Icon */}
          <IconButton onClick={() => handleDeleteOption(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}

      {/* Add Option Button */}
      <Button variant="outlined" onClick={handleAddOption}>
        Add Option
      </Button>

      {/* Marks Input */}
      <TextField
        type="number"
        value={positiveMarks}
        onChange={(e) => setPositiveMarks(e.target.value)}
        label="Positive Marks"
      />

      <TextField
        type="number"
        value={negativeMarks}
        onChange={(e) => setNegativeMarks(e.target.value)}
        label="Negative Marks"
      />

      {/* Save Button */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default SingleCorrectQuestionForm;

