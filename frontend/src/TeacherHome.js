// import React, { useState } from 'react';
// import SingleCorrectQuestionForm from './SingleCorrectQuestionForm'; // Import the Single Correct Question Form component
// // Import other question form components if needed

// const TeacherHome = ({ userInfo }) => {
//   const [creatingMockTest, setCreatingMockTest] = useState(false);
//   const [mockTestName, setMockTestName] = useState('');
//   const [mockTestDuration, setMockTestDuration] = useState(0);
//   const [selectedQuestionType, setSelectedQuestionType] = useState(null);

//   const handleLogout = () => {
//     // Clear the authentication token from local storage or perform any other necessary logout logic
//     console.log('Logout button clicked');
//     localStorage.removeItem('token');

//     // Redirect to the login page
//     // navigate('/login');
//     window.location.href = '/login';
//   };

//   const createMockTest = () => {
//     // Handle the creation of the mock test with the provided data
//     console.log({
//       testName: mockTestName,
//       testDuration: mockTestDuration,
//       questionType: selectedQuestionType,
//     });

//     // Reset state after creating the mock test
//     setCreatingMockTest(false);
//     setMockTestName('');
//     setMockTestDuration(0);
//     setSelectedQuestionType(null);
//   };

//   const renderQuestionForm = () => {
//     switch (selectedQuestionType) {
//       case 'singleCorrect':
//         return <SingleCorrectQuestionForm />;
//       // Add other cases for different question types and import their respective components
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <h2>Welcome, {userInfo.username}!</h2>
//       <p>Your role: Teacher</p>

//       <button onClick={() => setCreatingMockTest(true)}>Create Mock Test</button>

//       {/* Logout button */}
//       <button onClick={handleLogout}>Logout</button>

//       {/* Render question form based on the selected question type */}
//       {creatingMockTest && (
//         <div>
//           <label>
//             Test Name:
//             <input
//               type="text"
//               value={mockTestName}
//               onChange={(e) => setMockTestName(e.target.value)}
//             />
//           </label>
//           <br />

//           <label>
//             Test Duration (in minutes):
//             <input
//               type="number"
//               value={mockTestDuration}
//               onChange={(e) => setMockTestDuration(e.target.value)}
//             />
//           </label>
//           <br />

//           <label>
//             Question Type:
//             <select
//               value={selectedQuestionType}
//               onChange={(e) => setSelectedQuestionType(e.target.value)}
//             >
//               <option value="">Select Question Type</option>
//               <option value="singleCorrect">Single Correct</option>
//               {/* Add other question types as needed */}
//             </select>
//           </label>
//           <br />

//           {selectedQuestionType && renderQuestionForm()}

//           <button onClick={createMockTest}>Create Mock Test</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherHome;
import React, { useState, useEffect } from 'react';
import SingleCorrectQuestionForm from './SingleCorrectQuestionForm';

const TeacherHome = ({ userInfo }) => {
  const [creatingMockTest, setCreatingMockTest] = useState(false);
  const [mockTestName, setMockTestName] = useState('');
  const [mockTestDuration, setMockTestDuration] = useState(0);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  // Load user information from localStorage on component mount
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      // Set user information from localStorage
      setMockTestName(storedUserInfo.mockTestName || '');
      setMockTestDuration(storedUserInfo.mockTestDuration || 0);
      setSelectedQuestionType(storedUserInfo.selectedQuestionType || null);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logout button clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo'); // Clear user information on logout
    window.location.href = '/login';
  };

  const createMockTest = () => {
    // Save user information to localStorage
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        mockTestName,
        mockTestDuration,
        selectedQuestionType,
      })
    );

    console.log({
      testName: mockTestName,
      testDuration: mockTestDuration,
      questionType: selectedQuestionType,
    });

    // Reset state after creating the mock test
    setCreatingMockTest(false);
    setMockTestName('');
    setMockTestDuration(0);
    setSelectedQuestionType(null);
  };

  const renderQuestionForm = () => {
    switch (selectedQuestionType) {
      case 'singleCorrect':
        return <SingleCorrectQuestionForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <p>Your role: Teacher</p>

      <button onClick={() => setCreatingMockTest(true)}>Create Mock Test</button>

      <button onClick={handleLogout}>Logout</button>

      {creatingMockTest && (
        <div>
          <label>
            Test Name:
            <input
              type="text"
              value={mockTestName}
              onChange={(e) => setMockTestName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Test Duration (in minutes):
            <input
              type="number"
              value={mockTestDuration}
              onChange={(e) => setMockTestDuration(e.target.value)}
            />
          </label>
          <br />

          <label>
            Question Type:
            <select
              value={selectedQuestionType}
              onChange={(e) => setSelectedQuestionType(e.target.value)}
            >
              <option value="">Select Question Type</option>
              <option value="singleCorrect">Single Correct</option>
            </select>
          </label>
          <br />

          {selectedQuestionType && renderQuestionForm()}

          <button onClick={createMockTest}>Create Mock Test</button>
        </div>
      )}
    </div>
  );
};

export default TeacherHome;

