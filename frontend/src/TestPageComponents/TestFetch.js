// TestFetch.js
import React, { useEffect } from 'react';

const TestFetch = ({ userInfo, testId, setTestDetails, setQuestions ,setOptions}) => {
  
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        console.log('Fetching data from the backend');
        const response = await fetch(`http://localhost:8000/api/getTestDetails/${userInfo.username}/${testId}`);
        const data = await response.json();

        console.log('Fetched data:', data);

        if (data.success) {
          setTestDetails(data.test);
          setQuestions(data.test.questions);  // Update questions after setting test details
        //   setOptions(data.test.questions.options);
        } else {
          console.error('Failed to fetch test details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTestDetails();
  }, [userInfo.username, testId, setTestDetails, setQuestions]);

  return null;
};

export default TestFetch;