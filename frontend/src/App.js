// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TeacherHome from './TeacherHome';
import StudentHome from './StudentHome';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (role, user) => {
    setUserRole(role);
    setUserInfo(user);
    setAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <nav>
          {/* Navigation links */}
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/TeacherHome">Teacher Home</Link>
            </li>
            <li>
              <Link to="/StudentHome">Student Home</Link>
            </li> */}
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route
            path="/signup"
            element={
              authenticated ? <Navigate to={`/${userRole}Home`} /> : <Signup onLogin={handleLogin} />
            }
          />
          <Route
            path="/login"
            element={
              authenticated ? <Navigate to={`/${userRole}Home`} /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/TeacherHome"
            element={
              authenticated && userRole === 'teacher' ? (
                <TeacherHome userInfo={userInfo} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/StudentHome"
            element={
              authenticated && userRole === 'student' ? (
                <StudentHome userInfo={userInfo} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
