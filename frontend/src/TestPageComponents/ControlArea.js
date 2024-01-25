import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ControlArea({ setCurrentQuestionIndex, currentQuestionIndex, questionsLength, username, questionId, optionsRef, integerAnsRef, lowDecimalRef, highDecimalRef,testId }) {

  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentQuestionIndex((currentQuestionIndex) => Math.min(currentQuestionIndex + 1, questionsLength - 1));
  };

  const handleBack = () => {
    setCurrentQuestionIndex((currentQuestionIndex) => Math.max(currentQuestionIndex - 1, 0));
  };


  const handleUpdateQuestion = async () => {

    try {
      const response = await fetch(`http://localhost:8000/api/updateQuestion/${username}/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options: optionsRef.current,
          integerAns: parseInt(integerAnsRef.current, 10) || null,
          lowDecimal: parseFloat(lowDecimalRef.current) || null,
          highDecimal: parseFloat(highDecimalRef.current) || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Question updated successfully');
        // Optionally, you can redirect to another page or show a success message
      } else {
        console.error('Failed to update question:', data.error);
        // Optionally, handle the error (show an error message, etc.)
      }
      optionsRef.current = null;
      integerAnsRef.current = null;
      lowDecimalRef.current = null;
      highDecimalRef.current = null;
    } catch (error) {
      console.error('Error updating question:', error);
      // Optionally, handle the error (show an error message, etc.)
    }
    handleNext();

  };
  const handleEndTest = async () => {
    await handleUpdateQuestion();
    navigate(`/result/${testId}`);
  }


  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleUpdateQuestion}>Save and Next</button>
      <button onClick={handleEndTest}>End Test</button>
    </div>
  );
}