// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {useSelector} from 'react-redux'
// const GroupTests = ({ tests, onJoinTestClick }) => {
//     const user = useSelector((state) => state.auth.user);
  
//     return (
//       <div>
//         <h3>Tests</h3>
//         <ul>
//           {tests.length > 0 ? tests.map((test, index) => (
//             <li key={test._id}>
//               {index + 1}. {test.testName}
//               {user.role === 'student' && (
//                 <button onClick={() => onJoinTestClick(test._id)} style={joinButtonStyle}>Join Test</button>
//               )}
//             </li>
//           )) : (
//             <p>No Tests in this Group</p>
//           )}
//         </ul>
//       </div>
//     );
//   };
//   const joinButtonStyle = {
//     padding: '5px 10px',
//     cursor: 'pointer',
//     backgroundColor: 'green',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     marginLeft: '10px',
//   };

// const GroupMembers = ({ teachers, students }) => {
//   return (
//     <div>
//       <h3>Teachers</h3>
//       <ul>
//         {teachers.map((teacher, index) => (
//           <li key={teacher._id}>{index + 1}. {teacher.username}</li>
//         ))}
//       </ul>
//       <h3>Students</h3>
//       {students.length > 0 ? (
//         <ul>
//           {students.map((student, index) => (
//             <li key={student._id}>{index + 1}. {student.username}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No students</p>
//       )}
//     </div>
//   );
// };

// const StudentGroupDetailsPage = () => {
//   const { groupId } = useParams(); // Assuming you have groupId in the URL params
//   const [group, setGroup] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [activeTab, setActiveTab] = useState('members'); // To handle tab switching

//   useEffect(() => {
//     const fetchGroupDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/groups/${groupId}`);
//         setGroup(response.data);
//       } catch (error) {
//         console.error('Error fetching group details:', error);
//         setErrorMessage('Error fetching group details');
//       }
//     };

//     fetchGroupDetails();
//   }, [groupId]);

//   if (!group) {
//     return <div>Loading...</div>; // Add a loading indicator if group data is being fetched
//   }

//   return (
//     <div>
//       <h2>Group Details: {group.name}</h2>
//       <div style={navStyles}>
//         <button style={activeTab === 'members' ? activeButtonStyle : buttonStyle} onClick={() => setActiveTab('members')}>Members</button>
//         <button style={activeTab === 'tests' ? activeButtonStyle : buttonStyle} onClick={() => setActiveTab('tests')}>Tests</button>
//       </div>
//       <hr />
//       {activeTab === 'members' ? (
//         <GroupMembers teachers={group.teachers} students={group.students} />
//       ) : (
//         <GroupTests tests={group.tests} />
//       )}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// const navStyles = {
//   display: 'flex',
//   justifyContent: 'flex-start', // Align buttons to the left
//   gap: '10px', // Add space between buttons
//   marginBottom: '20px',
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   cursor: 'pointer',
//   backgroundColor: 'gray',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   transition: 'background-color 0.3s',
// };

// const activeButtonStyle = {
//   ...buttonStyle,
//   backgroundColor: '#222',
//   textDecoration: 'underline',
//   fontWeight: 'bold',
// };

// export default StudentGroupDetailsPage;
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GroupTests = ({ tests, onJoinTestClick }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h3>Tests</h3>
      <ul>
        {tests.length > 0 ? tests.map((test, index) => (
          <li key={test._id}>
            {index + 1}. {test.testName}
            {user.role === 'student' && (
              <button onClick={() => onJoinTestClick(test._id)} style={joinButtonStyle}>Join Test</button>
            )}
          </li>
        )) : (
          <p>No Tests in this Group</p>
        )}
      </ul>
    </div>
  );
};

const joinButtonStyle = {
  padding: '5px 10px',
  cursor: 'pointer',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginLeft: '10px',
};

const GroupMembers = ({ teachers, students }) => {
  return (
    <div>
      <h3>Teachers</h3>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={teacher._id}>{index + 1}. {teacher.username}</li>
        ))}
      </ul>
      <h3>Students</h3>
      {students.length > 0 ? (
        <ul>
          {students.map((student, index) => (
            <li key={student._id}>{index + 1}. {student.username}</li>
          ))}
        </ul>
      ) : (
        <p>No students</p>
      )}
    </div>
  );
};

const StudentGroupDetailsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('members');
  const user = useSelector((state) => state.auth.user);
  const TestDetails = useRef('');

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/groups/${groupId}`);
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
        setErrorMessage('Error fetching group details');
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  const addTestInStudent = async (testDetails) => {
    try {
      const response = await fetch('http://localhost:8000/api/addTestInStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: user.username,
          testDetails: testDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Student tests updated successfully');
      } else {
        console.error('Failed to update student tests:', data.error);
      }
    } catch (error) {
      console.error('Error updating student tests:', error);
    }
  };

  const fetchTestDetails = async (testId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/getTest/${testId}`);
      const data = await response.json();

      if (data.success) {
        TestDetails.current = data.test;
      } else {
        console.error('Failed to fetch test details:', data.error);
      }
    } catch (error) {
      console.error('Error fetching test details:', error);
    }
  };

  const handleJoinTestClick = async (testId) => {
    await fetchTestDetails(testId);
    await addTestInStudent(TestDetails.current);
   // navigate(`/testpage/${testId}`);
   navigate(`/testDetails/${testId}`);

  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Group Details: {group.name}</h2>
      <div style={navStyles}>
        <button style={activeTab === 'members' ? activeButtonStyle : buttonStyle} onClick={() => setActiveTab('members')}>Members</button>
        <button style={activeTab === 'tests' ? activeButtonStyle : buttonStyle} onClick={() => setActiveTab('tests')}>Tests</button>
      </div>
      <hr />
      {activeTab === 'members' ? (
        <GroupMembers teachers={group.teachers} students={group.students} />
      ) : (
        <GroupTests tests={group.tests} onJoinTestClick={handleJoinTestClick} />
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

const navStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '10px',
  marginBottom: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: 'gray',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#222',
  textDecoration: 'underline',
  fontWeight: 'bold',
};

export default StudentGroupDetailsPage;
