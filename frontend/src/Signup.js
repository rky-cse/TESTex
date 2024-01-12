// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     role: 'student',
//   });

//   const [errorMessage, setErrorMessage] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setErrorMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('http://localhost:5000/signup', formData);
//       console.log('User created successfully');
//       // Optionally: Redirect to another page or perform other actions upon successful signup
//     } catch (error) {
//       console.error('Error creating user:', error.message);
//       if (error.response && error.response.status === 400) {
//         setErrorMessage('Username already exists. Please choose a different username.');
//       } else {
//         setErrorMessage('Error creating user. Please try again.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" name="username" onChange={handleInputChange} required />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" name="password" onChange={handleInputChange} required />
//         </label>
//         <br />
//         <label>
//           Role:
//           <select name="role" onChange={handleInputChange} value={formData.role} required>
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//           </select>
//         </label>
//         <br />
//         <button type="submit">Signup</button>
//       </form>

//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '', // Add role field to your form
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful');
      const { role, username } = formData;

      onLogin(role, { username });

      if (role === 'teacher') {
        navigate('/TeacherHome');
      } else if (role === 'student') {
        navigate('/StudentHome');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);

      if (error.response && error.response.status === 400) {
        setErrorMessage('Username already exists. Please choose a different username.');
      } else {
        setErrorMessage('Error during signup. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <label>
          Role:
          <select name="role" onChange={handleInputChange} required>
            <option value="" disabled selected>Select role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
