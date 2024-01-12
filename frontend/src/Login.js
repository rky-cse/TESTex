import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Get the navigate function from the hook
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:5000/login', formData);
  //     console.log('Login successful');
  //     console.log(response.data.user.role);
  //     const userRole = response.data.user.role;

  //     // Update the user role using the onLogin prop
  //     onLogin(userRole);

  //     // Use navigate to redirect to the respective home page
  //     if (userRole === 'teacher') {
  //       navigate('/TeacherHome');
  //     } else if (userRole === 'student') {
  //       navigate('/StudentHome');
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error.message);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log('Login successful');
      const { role, username } = response.data.user;

      // Update the user information using the onLogin prop
      onLogin(role, { username });

      // Use navigate to redirect to the respective home page
      if (role === 'teacher') {
        navigate('/TeacherHome');
      } else if (role === 'student') {
        navigate('/StudentHome');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
