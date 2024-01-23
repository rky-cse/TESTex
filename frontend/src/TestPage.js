import React, { useState,useRef } from 'react';
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
 
  const optionsRef=useRef(null);
  // const [integerAns,setIntegerAns]=useState(null);
  const integerAnsRef=useRef(null);
  // const [lowDecimal,setLowDecimal]=useState(null);
  const lowDecimalRef=useRef(null);
  // const [highDecimal,setHighDecimal]=useState(null);
 const highDecimalRef=useRef(null);



  if (!testDetails) {
    return (
    <TestFetch
       userInfo={userInfo}
      testId={testId}
      setTestDetails={setTestDetails}
      setQuestions={setQuestions}
      // setOptions={setOptions}

          
          >Loading...</TestFetch>)
  }
  console.log(lowDecimalRef)
  console.log(integerAnsRef)
  console.log(optionsRef.current);

  return (
    <div>
      <h1>Test Page</h1>
      <p>Test ID: {testId}</p>
      <p>Username: {userInfo.username}</p>

      {/* Use TestFetch to handle fetching logic */}
      <TestFetch userInfo={userInfo} testId={testId} setTestDetails={setTestDetails} setQuestions={setQuestions} />

      {/* Render components */}
      <TimeArea duration={testDetails.duration} />

      {/* Display the current question in QuestionTextArea */}
      <QuestionTextArea question={questions[currentQuestionIndex]} questionNumber={currentQuestionIndex + 1} />

      {/* Render the options for the current question in AnswerArea */}
      <AnswerArea
       question={questions[currentQuestionIndex]}
      //  setOptions={setOptions}
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
      />
      <QuestionButtonArea />
      <StatusArea />
    </div>
  );
};

export default TestPage;

