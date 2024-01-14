
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getQuestions');
        const data = await response.json();

        console.log('Server response:', data);

        if (data.success) {
          setQuestions(data.questions || []);
        } else {
          console.error('Invalid data received from the server');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Function to render options for multiple correct questions
  const renderOptions = (options) => {
    return (
      <ul>
        {options.map((option, optionIndex) => (
          <li key={optionIndex}>
            {option.text} - {option.isCorrect ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
    );
  };

  // Function to render question based on its type
  const renderQuestion = (question, index) => {
    return (
      <li key={index}>
        <h3>{question.question}</h3>
        {question.questionType === 'singleCorrect' && renderOptions(question.options)}
        {question.questionType === 'multipleCorrect' && renderOptions(question.options)}
        {question.questionType === 'integerType' && <p>Answer: {question.answer}</p>}
        {question.questionType === 'decimalType' && (
          <p>
            Answer Range: {question.answerMin} to {question.answerMax}
          </p>
        )}
      </li>
    );
  };

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question, index) => renderQuestion(question, index))}
      </ul>

      {/* Add Question Button - Link to AddQuestionPage */}
      <Link to="/add-question">
        <button>Add Question</button>
      </Link>
    </div>
  );
};

export default QuestionPage;
