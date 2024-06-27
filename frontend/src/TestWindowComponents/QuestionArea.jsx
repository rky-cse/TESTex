import React from 'react';

const QuestionArea = ({ question }) => {
  return (
    <div className="question-area">
      <h2>Question</h2>
      <div className="question-content">
        <p>{question.questionText}</p>
        {/* Additional logic to render question image if available */}
        {question.questionImage && (
          <img src={question.questionImage} alt="Question" className="question-image" />
        )}
      </div>
      
    </div>
  );
};

export default QuestionArea;
