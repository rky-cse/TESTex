// import './QuestionButton.css'; // Import your CSS file

// const QuestionButtonArea = ({ questionsLength, setCurrentQuestionIndex,currentQuestionIndex ,questionstatus}) => {
//   const renderButtons = () => {
//     const buttons = [];
//     for (let i = 0; i <questionsLength; i++) {
//       buttons.push(
//         <div key={i}>
//           <button
//             onClick={() => setCurrentQuestionIndex(i)}
//             className={currentQuestionIndex === i ? 'active' : ''}
//           >
//             {i + 1} question
//           </button>
//         </div>
//       );
//     }
//     return buttons;
//   };

//   // console.log('Buttons:', renderButtons()); // Add this line for debugging
//   // console.log(totalQuestions)
//   return (
//     <div className="question-buttons">
//       {renderButtons()}
//     </div>
//   );
// };

// export default QuestionButtonArea;
import React from 'react';
import './QuestionButton.css'; // Import your CSS file

const QuestionButtonArea = ({ questionsLength, setCurrentQuestionIndex, currentQuestionIndex, questionStatus }) => {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < questionsLength; i++) {
      const status = questionStatus && questionStatus[i];
      buttons.push(
        <div key={i}>
          <button
            onClick={() => setCurrentQuestionIndex(i)}
            className={currentQuestionIndex === i ? 'active' : getButtonStatusClass(status)}
          >
            {i + 1}
          </button>
        </div>
      );
    }
    return buttons;
  };

  const getButtonStatusClass = (status) => {
    switch (status) {
      case 1:
        return 'answered';
      case 2:
        return 'visited';
      default:
        return 'grey';
    }
  };

  return <div className="question-buttons">{renderButtons()}</div>;
};

export default QuestionButtonArea;
