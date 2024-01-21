import React, { useState, useEffect } from 'react';
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
  const [testDetails, setTestDetails] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/getTest/${testId}`);
        const data = await response.json();

        if (data.success) {
          console.log("data fetched")
          setTestDetails(data.test);
          console.log(testDetails);
        } else {
          console.error('Failed to fetch test details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTestDetails();
  }, [testId]);
  useEffect(() => {
    console.log(testDetails);
  }, [testDetails]);

  if (!testDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Test Page</h2>
      <p>Test ID: {testId}</p>
      <p>Test Name: {testDetails.testName}</p>

      {/* Include your newly created components */}
      <TimeArea testDetails={testDetails} />
      <QuestionTextArea testDetails={testDetails} />
      <AnswerArea testDetails={testDetails} />
      <ControlArea testDetails={testDetails} />
      <StatusArea testDetails={testDetails} />
      <QuestionButtonArea testDetails={testDetails} />

      {/* Other content for the TestPage */}
    </div>
  );
};

export default TestPage;
