import React, { useEffect, useRef, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

// TestPage.js
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TimeArea from './TestPageComponents/TimeArea';
import QuestionTextArea from './TestPageComponents/QuestionTextArea';
import AnswerArea from './TestPageComponents/AnswerArea';
import ControlArea from './TestPageComponents/ControlArea';
import QuestionButtonArea from './TestPageComponents/QuestionButtonArea';
import StatusArea from './TestPageComponents/StatusArea';
import TestFetch from './TestPageComponents/TestFetch';

const TestPage = (props) => {
  const { testId } = useParams();
  const { userInfo } = props;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testDetails, setTestDetails] = useState(null);
  const [questionStatus, setQuestionStatus] = useState([]);

  const optionsRef = useRef(null);
  const integerAnsRef = useRef(null);
  const lowDecimalRef = useRef(null);
  const highDecimalRef = useRef(null);

  if (!testDetails) {
    return (
      <TestFetch
        userInfo={userInfo}
        testId={testId}
        setTestDetails={setTestDetails}
        setQuestions={setQuestions}
      >
        Loading...
      </TestFetch>
    );
  }

  // Initialize questionStatus array with 0 for each question
  if (questions.length > 0 && questionStatus.length === 0) {
    setQuestionStatus(Array(questions.length).fill(0));
  }
  console.log(questionStatus)

  return (
    <div>
      <h1>Test Page</h1>
      <p>Test ID: {testId}</p>
      <p>Username: {userInfo.username}</p>

      {/* Render components */}
      <TimeArea duration={testDetails.duration} />
      <QuestionTextArea question={questions[currentQuestionIndex]} questionNumber={currentQuestionIndex + 1} />
      <AnswerArea
        question={questions[currentQuestionIndex]}
        optionsRef={optionsRef}
        integerAnsRef={integerAnsRef}
        lowDecimalRef={lowDecimalRef}
        highDecimalRef={highDecimalRef}
      />
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
      <QuestionButtonArea
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        questionsLength={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        questionStatus={questionStatus}
      />
      <StatusArea questionStatus={questionStatus}/>
    </div>
  );
};

export default TestPage;
