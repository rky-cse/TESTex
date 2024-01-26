// QuestionTextArea.js
import React from 'react';

const SolutionQuestionTextArea = ({ question ,questionNumber}) => {
  if (!question) {
    return null; // Render nothing if no question is provided
  }

  const { questionType,questionText } = question;
  

  return (
    <div>
      <p>Question Type: {questionType}</p>
      <p>Question Number: {questionNumber}</p>
      <p>Question Text: {questionText}</p>
    </div>
  );
};

export default SolutionQuestionTextArea;
