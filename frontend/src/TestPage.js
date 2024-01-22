import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TimeArea from './TestPageComponents/TimeArea';
import QuestionTextArea from './TestPageComponents/QuestionTextArea';
import AnswerArea from './TestPageComponents/AnswerArea';
import ControlArea from './TestPageComponents/ControlArea';
import QuestionButtonArea from './TestPageComponents/QuestionButtonArea';
import StatusArea from './TestPageComponents/StatusArea';

const TestPage = ({userInfo}) => {
  const { testId } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

 
  const handleNext = () => {
    // Check if the current question is the last one
    if (currentIndex < testDetails.questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Handle the case when attempting to go beyond the last question
      console.warn('Already on the last question.');
    }
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  return (
    <div>
      <h2>Test Page</h2>
      <p>Test ID: {testId}</p>
      <p>Test Name: {testDetails.testName}</p>

      {/* Include your newly created components */}
      <TimeArea testDetails={testDetails} index={currentIndex} />
      <QuestionTextArea testDetails={testDetails} index={currentIndex} />
      <AnswerArea testDetails={testDetails} index={currentIndex} />
      <QuestionButtonArea testDetails={testDetails} index={currentIndex} />
      <StatusArea testDetails={testDetails} index={currentIndex} />

      {/* Always enable the "Submit" and "Next" buttons */}
      <ControlArea
        onNext={handleNext}
        onBack={handleBack}
        testDetails={testDetails} index={currentIndex} 
        isSubmitEnabled={true} // "Submit" button always enabled
      />

      {/* Other content for the TestPage */}
    </div>
  );
};

export default TestPage;
