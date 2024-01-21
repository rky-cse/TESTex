
import React, { useState } from 'react';

const AnswerArea = ({ testDetails, index }) => {
  const options = testDetails.questions[index].options;
  const questionType = testDetails.questions[index].questionType;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [integerAnswer,setIntegerAnswer]=useState();
  const [decimalAnswer,setDecimalAnswer]=useState();

  const handleOptionChange = (option) => {
    if (questionType === 'singleCorrect') {
      // For single correct question, only one option can be selected at a time
      setSelectedOptions([option]);
    } else {
      // For multiple correct, toggle the selected state of the option
      setSelectedOptions((prevSelectedOptions) => {
        if (prevSelectedOptions.includes(option)) {
          return prevSelectedOptions.filter(
            (selectedOption) => selectedOption !== option
          );
        } else {
          return [...prevSelectedOptions, option];
        }
      });
    }
  };
  const renderAnswerOptions = () => {
    if (!options || options.length === 0) {
      return <p>No answer options available.</p>;
    }
  
    return options.map((option, index) => (
      <div key={index}>
        {questionType === 'integerType' && (
          <input
            type="number"
            value={selectedOptions.includes(option.text) ? selectedOptions[0] : ''}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
        )}
        {questionType === 'decimalType' && (
          <input
            type="number"
            step="0.01"
            value={selectedOptions.includes(option.text) ? selectedOptions[0] : ''}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
        )}
        {questionType === 'singleCorrect' && (
          <input
            type="radio"
            name="singleCorrectOption"
            checked={selectedOptions[0] === option.text}
            onChange={() => handleOptionChange(option.text)}
          />
        )}
        {questionType === 'multipleCorrect' && (
          <input
            type="checkbox"
            checked={selectedOptions.includes(option.text)}
            onChange={() => handleOptionChange(option.text)}
          />
        )}
        <label>{option.text}</label>
      </div>
    ));
  };
  
  return (
    <div>
      <h3>Answer Area</h3>
      {renderAnswerOptions()}
      {/* Add empty input fields for 'integerType' and 'decimalType' */}
      {questionType === 'integerType' && (
        <div>
          <input
            type="number"
            value={integerAnswer}
            onChange={(e) => setIntegerAnswer(e.target.value)}
          />
          <label>Empty Integer Field</label>
        </div>
      )}
      {questionType === 'decimalType' && (
        <div>
          <input
            type="number"
            step="0.01"
            value={decimalAnswer}
            onChange={(e) =>setDecimalAnswer(e.target.value)}
          />
          <label>Empty Decimal Field</label>
        </div>
      )}
    </div>
  );
};

export default AnswerArea;
