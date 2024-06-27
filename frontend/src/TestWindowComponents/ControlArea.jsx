// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setQuestionIndex } from '../store/slices/TestSlice';

// const ControlArea = ({ questionId, currentIndex, questionsLength }) => {
//   const dispatch = useDispatch();

//   const handleNext = () => {
//     if (currentIndex < questionsLength - 1) {
//       const nextIndex = currentIndex + 1;
//       dispatch(setQuestionIndex(nextIndex));
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       const previousIndex = currentIndex - 1;
//       dispatch(setQuestionIndex(previousIndex));
//     }
//   };

//   return (
//     <div style={styles.controlArea}>
//       <button onClick={handlePrevious} disabled={currentIndex === 0}>
//         Previous
//       </button>
//       <button onClick={handleNext} disabled={currentIndex === questionsLength - 1}>
//         Next
//       </button>
//     </div>
//   );
// };

// const styles = {
//   controlArea: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '10px',
//   },
// };

// export default ControlArea;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionIndex } from '../store/slices/TestSlice';

const ControlArea = ({questionId,currentIndex, questionsLength,testId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  username  = useSelector(state => state.auth?.user?.username); //Assuming username is available in auth.user
  const question = useSelector(state => state.test?.test?.test?.questions?.find(q => q._id === questionId));
  const handleNext = async () => {
    if (currentIndex < questionsLength - 1) {
      const nextIndex = currentIndex + 1;
      dispatch(setQuestionIndex(nextIndex));
      await updateQuestion(username, questionId); // Call API to update question
    }
  };

  const handlePrevious = async () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      dispatch(setQuestionIndex(previousIndex));
      await updateQuestion(username,questionId); // Call API to update question
    }
  };

  const updateQuestion = async (username, questionId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/updateQuestion/${username}/${questionId}`, {
        method: 'PUT', // Adjust method as per your backend API
        headers: {
          'Content-Type': 'application/json',
        },
        // Optionally, send updated question data in the body if needed
        body: JSON.stringify({
          // Add relevant updated question data from Redux state if needed
          options:question.options,
          integerAns:question.integerAns,
          lowDecimal:question.lowDecimal,
          highDecimal:question.highDecimal,


        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update question on the server.');
      }

      // Handle successful response or further actions if needed
    } catch (error) {
      console.error('Error updating question:', error);
      // Handle error scenarios, e.g., display error message
    }
  };
  const handleEndTest = async () => {
    await updateQuestion(username,questionId); 
    navigate(`/result/${testId}`); // Navigate to ResultPage.jsx
  };

  return (
    <div style={styles.controlArea}>
      <button onClick={handlePrevious} disabled={currentIndex === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentIndex === questionsLength - 1}>
        Next
      </button>
      <button onClick={handleEndTest} disabled={currentIndex !== questionsLength - 1}>
        End Test
      </button>
    </div>
  );
};

const styles = {
  controlArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
};

export default ControlArea;
