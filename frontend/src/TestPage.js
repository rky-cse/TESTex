import React from 'react';
import { useParams } from 'react-router-dom';

// Import your newly created components
import TimeArea from './TestPageComponents/TimeArea';
import QuestionTextArea from './TestPageComponents/QuestionTextArea';
import AnswerArea from './TestPageComponents/AnswerArea';
import ControlArea from './TestPageComponents/ControlArea';
import QuestionButtonArea from './TestPageComponents/QuestionButtonArea';
import StatusArea from './TestPageComponents/StatusArea';

const TestPage = () => {
  // Retrieve the 'testId' from the URL parameters
  const { testId } = useParams();

  return (
    <div>
      <h2>Test Page</h2>
      <p>Test ID: {testId}</p>

      {/* Include your newly created components */}
      <TimeArea />
      <QuestionTextArea />
      <AnswerArea />
      <ControlArea />
      <StatusArea />
      <QuestionButtonArea />

      {/* Other content for the TestPage */}
    </div>
  );
};

export default TestPage;
