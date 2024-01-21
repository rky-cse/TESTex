// QuestionButtonArea.js
import React from 'react';

const ControlArea = ({ onNext, onBack, isSubmitEnabled }) => {
  return (
    <div>
      {/* Other content for the QuestionButtonArea */}
      <button onClick={onBack} disabled={false}>
        Back
      </button>
      <button onClick={onNext} disabled={false}>
       Save and Next
      </button>
      <button onClick={onNext} disabled={!isSubmitEnabled}>
        {isSubmitEnabled ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default ControlArea;
