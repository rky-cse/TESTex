// App.js
import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TeacherHome from './TeacherHome';
import StudentHome from './StudentHome';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const handleLogin = (role, user) => {
    setUserRole(role);
    setUserInfo(user);
  };


  // const PrivateRoute = ({ element }) => {
  //   return element === 'teacher' ? <TeacherHome /> : element === 'student' ? <StudentHome /> : <Navigate to="/login" />;
  // };
  const PrivateRoute = ({ element ,allowedRoles}) => {
    return allowedRoles.includes(userRole) ? element : <Navigate to="/login" />;
  };
  
 

  return (
    <Router>
      <div>
        <nav>
          {/* ... (navigation links) */}
        </nav>

        <hr />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/TeacherHome"
            element={<PrivateRoute element={<TeacherHome userInfo={userInfo} />} allowedRoles={['teacher']} />}
          />
          <Route
            path="/StudentHome"
            element={<PrivateRoute element={<StudentHome userInfo={userInfo} />} allowedRoles={['student']} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
