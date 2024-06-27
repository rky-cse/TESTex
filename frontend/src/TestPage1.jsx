import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import TimeArea from './TestPageComponents/TimeArea';
import QuestionTextArea from './TestPageComponents/QuestionTextArea';
import AnswerArea from './TestPageComponents/AnswerArea';
import ControlArea from './TestPageComponents/ControlArea';
import QuestionButtonArea from './TestPageComponents/QuestionButtonArea';
import StatusArea from './TestPageComponents/StatusArea';

import './TestPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { TestActions } from './store/slices/TestSlice';

const TestPage1 = (props) => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const testDetails = useSelector((state) => state.test.test);
  const { userInfo } = props;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStatus, setQuestionStatus] = useState([]);

  const optionsRef = useRef(null);
  const integerAnsRef = useRef(null);
  const lowDecimalRef = useRef(null);
  const highDecimalRef = useRef(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        // Assuming you have an API endpoint to fetch test details by testId and username
        const response = await axios.get(`http://localhost:8000/api/getTestDetails/${user.username}/${testId}`);
        dispatch(TestActions.setTest(response.data));
      } catch (error) {
        console.error('Failed to fetch test details:', error);
      }
    };

    if (!testDetails) {
      fetchTestDetails();
    }
  }, [dispatch, testId, testDetails, user.username]);

  useEffect(() => {
    // Initialize questionStatus array with 0 for each question
    if (questions.length > 0 && questionStatus.length === 0) {
      setQuestionStatus(Array(questions.length).fill(0));
    }
  }, [questions.length, questionStatus.length]);

  // Assuming questions are fetched or populated elsewhere in your component

  if (!testDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="test-page-container">
      <div className="left-container">
        <div className="up-part">
          <h1>Exam Name: {testDetails.testName}</h1>
          <p>Candidate Username: {user.username}</p>
          <QuestionTextArea question={questions[currentQuestionIndex]} questionNumber={currentQuestionIndex + 1} />
        </div>
        <div className="middle-part">
          <AnswerArea
            question={questions[currentQuestionIndex]}
            optionsRef={optionsRef}
            integerAnsRef={integerAnsRef}
            lowDecimalRef={lowDecimalRef}
            highDecimalRef={highDecimalRef}
          />
        </div>
        <div className="down-part">
          <ControlArea
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
            username={userInfo.username}
            questionId={questions[currentQuestionIndex]._id}
            optionsRef={optionsRef}
            integerAnsRef={integerAnsRef}
            lowDecimalRef={lowDecimalRef}
            highDecimalRef={highDecimalRef}
            testId={testId}
            questionStatus={questionStatus}
            setQuestionStatus={setQuestionStatus}
          />
        </div>
      </div>

      <div className="right-container">
        <div className="up-part">
          <TimeArea duration={testDetails.duration} />
        </div>
        <div className="middle-part">
          <StatusArea questionStatus={questionStatus} />
        </div>
        <div className="down-part">
          <QuestionButtonArea
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            questionsLength={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            questionStatus={questionStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default TestPage1;
