const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path'); // Added to handle path more reliably
let questions = require('./data');
const app = express();
const port = 5000;
const secretKey = 'yourSecretKey'; // Replace with a strong secret key

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/quizApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to the database`);
  })
  .catch((e) => {
    console.error(`Couldn't connect to the database`, e); // Log the error
  });


// Option Schema
const optionSchema = new mongoose.Schema({
  optionText: String,
  isCorrect: Boolean,
  optionImage: String,
});

// Question Schema
const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ['singleCorrect', 'multipleCorrect', 'integerType', 'decimalType'],
  },
  questionText: String,
  questionImage: String,
  options: [optionSchema],
  positiveMark: Number,
  negativeMark: Number,
  partialMark: Number,
  integerAns: Number,
  lowDecimal: Number,
  highDecimal: Number,
});

// Test Schema
const testSchema = new mongoose.Schema({
  testName: String,
  duration: Number,
  questions: [questionSchema],
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['teacher', 'student'],
  },
  tests: [testSchema],
});

// Models
const UserModel = mongoose.model('User', userSchema);
const TestModel = mongoose.model('Test', testSchema);
const QuestionModel = mongoose.model('Question', questionSchema);
const OptionModel = mongoose.model('Option', optionSchema);

// Express routes
app.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ username, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error.message);
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      console.log('User from database:', user);
  
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'Error during login' });
    }
  });
  
  
  
  app.post('/api/saveFormData', async (req, res) => {
    try {
      const formData = req.body;
  
      // Push the new question to the existing questions array
      questions.push(formData);
  
      // Generate the JavaScript code to update data.js
      const updateCode = `module.exports = ${JSON.stringify(questions, null, 2)};\n`;
  
      // Write the update code to data.js
      await fs.writeFile(path.join(__dirname, 'data.js'), updateCode);
  
      res.status(200).json({ success: true, message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  });
  
  
  
  app.get('/api/getQuestions', (req, res) => {
    try {
      res.json({ success: true, questions: questions });
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
  });
// app.post('/users', async (req, res) => {
//   try {
//     const user = await UserModel.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Express route for creating or updating user
// Express route for creating or updating user
app.post('/users-add-test', async (req, res) => {
    const { username, tests } = req.body;
  
    try {
      // Check if the user with the given username already exists
      const existingUser = await UserModel.findOne({ username });
  
      if (existingUser) {
        // User exists, update the existing user with new test details
        if (tests && tests.length > 0) {
          existingUser.tests.push(tests[0]); // Assuming only one test is added at a time
          await existingUser.save();
        } else {
          return res.status(400).json({ error: 'No tests provided for update.' });
        }
  
        res.status(200).json(existingUser);
      } else {
        // User does not exist, create a new user
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//--
// Express route for creating or updating user question array
app.post('/users-add-question', async (req, res) => {
  const { username, role, tests } = req.body;

  try {
    // Check if the user with the given username and role (teacher) already exists
    const existingUser = await UserModel.findOne({ username, role });

    if (existingUser) {
      // Teacher exists, find the corresponding test
      const existingTest = existingUser.tests.find(test => test.testName === tests[0].testName);

      if (existingTest) {
        // Test exists, update the existing test with new question details
        if (tests[0].questions && tests[0].questions.length > 0) {
          existingTest.questions.push(tests[0].questions[0]); // Assuming only one question is added at a time
          await existingUser.save();
        } else {
          return res.status(400).json({ error: 'No questions provided for update.' });
        }
      } else {
        // Test does not exist, add a new test with the provided questions
        existingUser.tests.push(tests[0]);
        await existingUser.save();
      }

      res.status(200).json(existingUser);
    } else {
      // Teacher does not exist, create a new user with a new test and questions
      const newUser = await UserModel.create(req.body);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Express route for deleting a question by ID
// app.delete('/questions/:questionId', async (req, res) => {
//   const { questionId } = req.params;

//   try {
//     const { username, role, tests } = req.body;

//     // Find the user by username and role
//     const user = await UserModel.findOne({ username, role });

//     if (!user) {
//       return res.status(401).json({ error: 'User not found.' });
//     }

//     // Find the test by its name
//     const test = user.tests.find(t => t.testName === tests[0].testName);

//     if (!test) {
//       return res.status(402).json({ error: 'Test not found.' });
//     }

//     // Find the index of the question in the test's questions array
//     const questionIndex = test.questions.findIndex(q => q._id.toString() === questionId);

//     if (questionIndex === -1) {
//       return res.status(403).json({ error: 'Question not found in the specified test.' });
//     }

//     // Remove the question from the test
//     test.questions.splice(questionIndex, 1);

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: 'Question deleted successfully.' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// Express route for deleting a test by name
// app.delete('/tests/:testName', async (req, res) => {
//   const { testName } = req.params;

//   try {
//     const { username, role, tests } = req.body;

//     // Find the user by username and role
//     const user = await UserModel.findOne({ username, role });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Find the index of the test in the user's tests array
//     const testIndex = user.tests.findIndex(t => t.testName === testName);

//     if (testIndex === -1) {
//       return res.status(404).json({ error: 'Test not found.' });
//     }

//     // Remove the test from the user's tests array
//     user.tests.splice(testIndex, 1);

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: 'Test deleted successfully.' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Express route for getting questions by username and test name
app.get('/api/getQuestions/:username/:testName', async (req, res) => {
  try {
    const { username, testName } = req.params;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Find the test by test name
    const test = user.tests.find(t => t.testName === testName);

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    // Return the questions array
    res.status(200).json({ success: true, questions: test.questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
