

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
      <div>
        <nav>
          <ul>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/questions">Questions</Link></li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {authenticated && (
            <>
              <Route path="/TeacherHome" element={<TeacherHome userInfo={userInfo} />} />
              <Route path="/StudentHome" element={<StudentHome userInfo={userInfo} />} />
              <Route path="/CreateMockTest" element={<CreateMockTest />} />
              <Route path="/questions" element={<QuestionPage />} />
              <Route path="/add-question" element={<AddQuestionPage />} />
            </>
          )}

          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;