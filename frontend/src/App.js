
import './App.css'
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TeacherHome from './TeacherHome';
import StudentHome from './StudentHome';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user information is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { role, username } = JSON.parse(storedUser);
      setUserRole(role);
      setUserInfo({ username }); // Set the user information
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
            {/* {authenticated && (
              <>
                <li><Link to="/TeacherHome">Teacher Home</Link></li>
                <li><Link to="/StudentHome">Student Home</Link></li>
              </>
            )} */}
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
            </>
          )}

          <Route
            path="/"
            element={<Navigate to="/login" />} // Redirect to login if no matching route is found
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
