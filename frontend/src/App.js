

// // App.js
// import './App.css';
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import Signup from './Signup';
// import Login from './Login';
// import TeacherHome from './TeacherHome';
// import StudentHome from './StudentHome';
// import CreateMockTest from './CreateMockTest';
// import QuestionPage from './QuestionPage';
// import AddQuestionPage from './AddQuestionPage';
// import EditQuestion from './EditPages/EditQuestion';
// import TestPage from './TestPage'
// import ResultPage from './ResultPage';
// import SolutionPage from './SolutionPage';
// const App = () => {
//   const [userRole, setUserRole] = useState(null);
//   const [userInfo, setUserInfo] = useState({});
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//  const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const { role, username } = JSON.parse(storedUser);
//       setUserRole(role);
//       setUserInfo({ username });
//       setAuthenticated(true);
//     }
//   }, []);

//   const handleLogin = (role, user) => {
//     setUserRole(role);
//     setUserInfo(user);
//     setAuthenticated(true);
//   };

//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/signup">Signup</Link></li>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/questions">Questions</Link></li>
//           </ul>
//         </nav>

//         <hr />

//         <Routes>
//           <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />

//           {authenticated && (
//             <>
//               <Route path="/TeacherHome" element={<TeacherHome userInfo={userInfo} />} />
//               <Route path="/StudentHome" element={<StudentHome userInfo={userInfo} />} />
//               <Route path="/CreateMockTest" element={<CreateMockTest userInfo={userInfo}/>} />
//               <Route path="/questions/:testName" element={<QuestionPage userInfo={userInfo}/>} />
//               <Route path="/add-question/:testName" element={<AddQuestionPage userInfo={userInfo}/>} />
//               <Route path="/edit-question/:testName/:questionId" element={<EditQuestion userInfo={userInfo}/>} />
//               <Route path="/testpage/:testId" element={<TestPage userInfo={userInfo} />}/>
//               <Route path="/result/:testId" element={<ResultPage username={userInfo.username} />}/>
//               <Route path="/solutions/:testId/" element={<SolutionPage username={userInfo.username}/>} />
//             </>
//           )}

//           <Route
//             path="/"
//             element={<Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TeacherHome from './TeacherHome';
import StudentHome from './StudentHome';
import CreateMockTest from './CreateMockTest';
import QuestionPage from './QuestionPage';
import AddQuestionPage from './AddQuestionPage';
import EditQuestion from './EditPages/EditQuestion';
import TestPage from './TestPage'
import ResultPage from './ResultPage';
import SolutionPage from './SolutionPage';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { role, username } = JSON.parse(storedUser);
      setUserRole(role);
      setUserInfo({ username });
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (role, user) => {
    setUserRole(role);
    setUserInfo(user);
    setAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        {/* <header>
          <nav>
            <ul>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
             
            </ul>
          </nav>
        </header> */}

        <main>
          <Routes>
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {authenticated && (
              <>
                <Route path="/TeacherHome" element={<TeacherHome userInfo={userInfo} />} />
                <Route path="/StudentHome" element={<StudentHome userInfo={userInfo} />} />
                <Route path="/CreateMockTest" element={<CreateMockTest userInfo={userInfo} />} />
                <Route path="/questions/:testName" element={<QuestionPage userInfo={userInfo} />} />
                <Route path="/add-question/:testName" element={<AddQuestionPage userInfo={userInfo} />} />
                <Route path="/edit-question/:testName/:questionId" element={<EditQuestion userInfo={userInfo} />} />
                <Route path="/testpage/:testId" element={<TestPage userInfo={userInfo} />} />
                <Route path="/result/:testId" element={<ResultPage username={userInfo.username} />} />
                <Route path="/solutions/:testId/" element={<SolutionPage username={userInfo.username} />} />
              </>
            )}

            <Route
              path="/"
              element={<Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
