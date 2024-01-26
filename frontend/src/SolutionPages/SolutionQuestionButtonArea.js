import '../TestPageComponents/QuestionButton.css'; // Import your CSS file

const QuestionButtonArea = ({ questionsLength, setCurrentQuestionIndex,currentQuestionIndex }) => {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i <questionsLength; i++) {
      buttons.push(
        <div key={i}>
          <button
            onClick={() => setCurrentQuestionIndex(i)}
            className={currentQuestionIndex === i ? 'active' : ''}
          >
            {i + 1} question
          </button>
        </div>
      );
    }
    return buttons;
  };

  // console.log('Buttons:', renderButtons()); // Add this line for debugging
  // console.log(totalQuestions)
  return (
    <div className="question-buttons">
      {renderButtons()}
    </div>
  );
};

export default QuestionButtonArea;
