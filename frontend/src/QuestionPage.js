
import './QuestionPage.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleDelete = async (questionId) => {
    try {
      console.log('Question ID:', questionId);

      const deleteResponse = await fetch(`http://localhost:5000/api/deleteQuestion/${questionId._id}`, {
        method: 'DELETE',
      });

      const deleteData = await deleteResponse.json();

      if (deleteData.success) {
        const updatedQuestions = questions.filter((question) => question._id !== questionId._id);
        setQuestions(updatedQuestions);
      } else {
        console.error('Failed to delete question:', deleteData.message);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

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

  const renderQuestion = (question, index) => {
    const questionNumber = index + 1;

    return (
      <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>{`Question ${questionNumber}: ${question.question}`}</h3>
          {question.questionType === 'singleCorrect' && renderOptions(question.options)}
          {question.questionType === 'multipleCorrect' && renderOptions(question.options)}
          {question.questionType === 'integerType' && <p>Answer: {question.answer}</p>}
          {question.questionType === 'decimalType' && (
            <p>
              Answer Range: {question.answerMin} to {question.answerMax}
            </p>
          )}
        </div>
        <span
          style={{
            cursor: 'pointer',
            color: 'red',
          }}
          onClick={() => window.confirm('Are you sure you want to delete this question?') && handleDelete(question)}
        >
          <DeleteIcon />
        </span>
      </li>
    );
  };

  return (
    <div>
      <h2>Questions</h2>
      <ul>{questions.map((question, index) => renderQuestion(question, index))}</ul>

      <Link to="/add-question">
        <button>Add Question</button>
      </Link>
    </div>
  );
};

export default QuestionPage;
