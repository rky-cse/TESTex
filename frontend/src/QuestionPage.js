
import './QuestionPage.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate,useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const QuestionPage = ({userInfo}) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const username = userInfo.username;
  // const testName=state.testName;
  const { testName } = useParams();
  
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        
        const response = await fetch(`http://localhost:8000/api/getQuestions/${username}/${testName}`);
        const data = await response.json();
        
        if (data.success) {
          setQuestions(data.questions || []);
          console.log(questions);
        } else {
          console.error('Invalid data received from the server');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [testName, username]);  // Add testName and username to the dependency array

  const handleEdit = (question) => {
    // Implement your logic for handling the edit action
    console.log(`Edit button clicked for question: \n`);
    console.log(question)
    navigate(`/edit-question/${testName}/${question._id}`);
    // Redirect or open a modal for editing, etc.
    // You can use navigate(`/edit-question/${questionId}`) if you have a separate edit page
  };
  const handleDelete = async (questionId) => {
    console.log(questionId._id)
    console.log(typeof(questionId._id))
    try {
      console.log('Question ID:', questionId);

      const deleteResponse = await fetch(`http://localhost:8000/questions/${questionId._id}/${username}/${testName}`, {
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
          <h3>{`Question ${questionNumber}: ${question.questionText}`}</h3>
          {question.questionType === 'singleCorrect' && renderOptions(question.options)}
          {question.questionType === 'multipleCorrect' && renderOptions(question.options)}
          {question.questionType === 'integerType' && <p>Answer: {question.integerAns}</p>}
          {question.questionType === 'decimalType' && (
            <p>
              Answer Range: {question.lowDecimal} to {question.highDecimal}
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
        <span
          style={{
            cursor: 'pointer',
            color: 'blue',
            marginLeft: '10px',
          }}
          onClick={() => handleEdit(question)}
        >
          <EditIcon />
        </span>
      </li>
    );
  };
  const handleAddQuestionClick = () => {
    navigate(`/add-question/${testName}` );
  };
  return (
    <div>
      <h2>Questions</h2>
      <ul>{questions.map((question, index) => renderQuestion(question, index))}</ul>

      {/* <Link to="/add-question">
        <button>Add Question</button>
      </Link> */}
      <button onClick={handleAddQuestionClick}>Add Question</button>
    </div>
  );
};

export default QuestionPage;
