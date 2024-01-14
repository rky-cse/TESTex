import React, { useState } from 'react';
import SingleCorrectQuestionForm from './SingleCorrectQuestionForm';
import MultipleCorrectQuestionForm from './MultipleCorrectQuestionForm';
import IntegerTypeQuestionForm from './IntegerTypeQuestionForm';
import DecimalTypeQuestionForm from './DecimalTypeQuestionForm';

const AddQuestion = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState('');

  // Render the selected question type form based on the value of selectedQuestionType
  const renderQuestionForm = () => {
    switch (selectedQuestionType) {
      case 'singleCorrect':
        return <SingleCorrectQuestionForm />;
      case 'multipleCorrect':
        return <MultipleCorrectQuestionForm />;
      case 'integerType':
        return <IntegerTypeQuestionForm />;
      case 'decimalType':
        return <DecimalTypeQuestionForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>Add Question</h3>

      {/* Dropdown to select question type */}
      <label>
        Select Question Type:
        <select
          value={selectedQuestionType}
          onChange={(e) => setSelectedQuestionType(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="singleCorrect">Single Correct</option>
          <option value="multipleCorrect">Multiple Correct</option>
          <option value="integerType">Integer Type</option>
          <option value="decimalType">Decimal Type</option>
        </select>
      </label>
      <br />

      {/* Render the question form based on the selected type */}
      {selectedQuestionType && renderQuestionForm()}
    </div>
  );
};

export default AddQuestion;
