// import React from 'react';
// import { useSelector } from 'react-redux';
// import QuestionArea from './TestWindowComponents/QuestionArea';
// import AnswerArea from './TestWindowComponents/AnswerArea';

// const TestWindow = () => {
//   // Assuming your Redux store has a slice named 'test' with a 'questions' array

  
//   const questions = useSelector(state => state.test.test.test.questions);

//   // Fetch the first question (index 0) for rendering
//   const currentQuestion = questions && questions.length > 0 ? questions[0] : null;
//   console.log(currentQuestion._id)

//   return (
//     <div style={styles.testWindow}>
//       <div style={styles.leftPanel}>
//         <div style={styles.questionArea}>
//           {/* Render QuestionArea with the currentQuestion */}
//           {currentQuestion && <QuestionArea question={currentQuestion} />}
//         </div>
//         <div style={styles.answerArea}>
//           {/* Render AnswerArea */}
//           <AnswerArea questionId={currentQuestion._id} questionType={currentQuestion.questionType} />
//         </div>
//         <div style={styles.controlArea}>
//           {/* Placeholder for ControlArea */}
//           <h2>Control Area</h2>
//           <p>This is where controls like buttons and navigation will be.</p>
//         </div>
//       </div>
//       <div style={styles.verticalDivider} />
//       <div style={styles.rightPanel}>
//         {/* Right panel content */}
//         <h2>Other Content</h2>
//         <p>This is where additional content can go.</p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   testWindow: {
//     display: 'flex',
//     flexDirection: 'row',
//     height: '100vh', // Ensure full viewport height
//   },
//   leftPanel: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '70%', // Adjust width as per your design
//     overflowY: 'auto', // Enable vertical scrolling
//     padding: '10px', // Add padding if needed
//   },
//   rightPanel: {
//     width: '30%', // Adjust width as per your design
//     padding: '20px',
//     backgroundColor: '#fafafa', // Example background color
//   },
//   verticalDivider: {
//     width: '2px', // Divider width
//     backgroundColor: '#ccc', // Divider color
//   },
//   questionArea: {
//     padding: '10px',
//     marginBottom: '10px',
//     backgroundColor: '#f0f0f0', // Example background color
//     borderRadius: '4px', // Example border radius
//   },
//   answerArea: {
//     padding: '10px',
//     marginBottom: '10px',
//     backgroundColor: '#f0f0f0', // Example background color
//     borderRadius: '4px', // Example border radius
//   },
//   controlArea: {
//     padding: '10px',
//     marginBottom: '10px',
//     backgroundColor: '#f0f0f0', // Example background color
//     borderRadius: '4px', // Example border radius
//   },
// };

// export default TestWindow;


import React from 'react';
import { useSelector } from 'react-redux';
import QuestionArea from './TestWindowComponents/QuestionArea';
import AnswerArea from './TestWindowComponents/AnswerArea';
import ControlArea from './TestWindowComponents/ControlArea';
import QuestionStatusArea from './TestWindowComponents/QuestionStatusArea';
import QuestionButtonArea from './TestWindowComponents/QuestionButtonArea';


const TestWindow = () => {
  // Selecting questions array and currentIndex from Redux state
  const testId=useSelector(state => state.test?.test.test._id);
  const questions = useSelector(state => state.test?.test.test.questions);
  const currentIndex = useSelector(state => state.test.currentIndex);
  console.log(currentIndex)

  // Fetching current question based on currentIndex
  const currentQuestion = questions && questions.length > 0 ? questions[currentIndex] : null;
  console.log(currentQuestion)

  return (
    <div style={styles.testWindow}>
      <div style={styles.leftPanel}>
        <div style={styles.questionArea}>
          {/* Render QuestionArea with the currentQuestion */}
          {currentQuestion && <QuestionArea question={currentQuestion} />}
        </div>
        <div style={styles.answerArea}>
          {/* Render AnswerArea based on questionType */}
          {currentQuestion && (
            <AnswerArea questionId={currentQuestion._id} questionType={currentQuestion.questionType} />
          )}
        </div>
        <div style={styles.controlArea}>
          {/* Render ControlArea with questionId, currentIndex, and questionsLength */}
          {currentQuestion && (
            <ControlArea
              questionId={currentQuestion._id}
              currentIndex={currentIndex}
              questionsLength={questions.length}
              testId={testId}
            />
          )}
        </div>
      </div>
      <div style={styles.verticalDivider} />
      <div style={styles.rightPanel}>
        {/* Right panel content */}
        <QuestionStatusArea testId={testId}/>
        <QuestionButtonArea testId={testId}/>
        <p>This is where additional content can go.</p>
      </div>
    </div>
  );
};

const styles = {
  testWindow: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh', // Ensure full viewport height
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%', // Adjust width as per your design
    overflowY: 'auto', // Enable vertical scrolling
    padding: '10px', // Add padding if needed
  },
  rightPanel: {
    width: '30%', // Adjust width as per your design
    padding: '20px',
    backgroundColor: '#fafafa', // Example background color
  },
  verticalDivider: {
    width: '2px', // Divider width
    backgroundColor: '#ccc', // Divider color
  },
  questionArea: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f0', // Example background color
    borderRadius: '4px', // Example border radius
  },
  answerArea: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f0', // Example background color
    borderRadius: '4px', // Example border radius
  },
  controlArea: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f0', // Example background color
    borderRadius: '4px', // Example border radius
  },
};

export default TestWindow;
