const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path'); // Added to handle path more reliably
let questions = require('./data');
const app = express();
const port = 8000;
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
  text: String,
  isCorrect: Boolean,
  image: String,
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
      const existingUser = await UserModel.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new UserModel({ username, password: hashedPassword, role });
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
      const user = await UserModel.findOne({ username });
  
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


app.delete('/questions/:questionId/:username/:testName', async (req, res) => {
  const { questionId, username, testName } = req.params;
  console.log('Received request to delete question:', questionId);

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found.' });
    }

    // Find the test by its name
    const test = user.tests.find(t => t.testName === testName);

    if (!test) {
      return res.status(402).json({ success: false, error: 'Test not found.' });
    }

    // Find the index of the question in the test's questions array
    const questionIndex = test.questions.findIndex(q => q._id.toString() === questionId);

    if (questionIndex === -1) {
      return res.status(403).json({ success: false, error: 'Question not found in the specified test.' });
    }

    // Remove the question from the test
    test.questions.splice(questionIndex, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, message: 'Question deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



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
    console.log(username,testName);

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Find the test by test name
    console.log(user);
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
app.delete('/delete-test/:username/:testName', async (req, res) => {
  const { username, testName } = req.params;
  console.log(`Received request to delete test: ${testName} for user: ${username}`);

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    // Find the test by its name
    const testIndex = user.tests.findIndex(test => test.testName === testName);

    if (testIndex === -1) {
      return res.status(404).json({ success: false, error: 'Test not found.' });
    }

    // Remove the test from the user's tests array
    user.tests.splice(testIndex, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, message: 'Test deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get('/api/getTests/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Return the tests array
    res.status(200).json({ success: true, tests: user.tests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/get-question/:username/:testName/:questionId', async (req, res) => {
  const { username, testName, questionId } = req.params;
  console.log(`Received request to fetch details for question ${questionId} in test ${testName} for user ${username}`);

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    // Find the test by its name
    const test = user.tests.find(t => t.testName === testName);

    if (!test) {
      return res.status(404).json({ success: false, error: 'Test not found.' });
    }

    // Find the question by its ID
    const question = test.questions.find(q => q._id.toString() === questionId);

    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found.' });
    }

    // Return the details of the question
    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.put('/questions/:questionId/:username/:testName', async (req, res) => {
  const { questionId, username, testName } = req.params;
  const updatedQuestionData = req.body.question;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found.' });
    }

    // Find the test by its name
    const test = user.tests.find(t => t.testName === testName);

    if (!test) {
      return res.status(402).json({ success: false, error: 'Test not found.' });
    }

    // Find the question in the test's questions array
    const question = test.questions.find(q => q._id.toString() === questionId);

    if (!question) {
      return res.status(403).json({ success: false, error: 'Question not found in the specified test.' });
    }

    // Update the question details
    Object.assign(question, updatedQuestionData);

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, message: 'Question updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get('/api/getTest/:testId', async (req, res) => {
  try {
    const { testId } = req.params;

    // Find the user with the matching test
    const user = await UserModel.findOne({ 'tests._id': testId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    // Find the specific test within the user's tests array
    const test = user.tests.find(t => t._id.toString() === testId);


    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }
    const tempTest=test;
    tempTest.questions.forEach(question => {
      question.options.forEach(option=>{
        option.isCorrect=false;
      })
      question.lowDecimal=null
      question.highDecimal=null
      question.integerAns=null
      
    });

    // Return the test details
    res.status(200).json({ success: true,test:tempTest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post('/api/addTestInStudent', async (req, res) => {
  const { studentId, testDetails } = req.body;

  try {
    // Find the student by their userId
    console.log(testDetails._id.toString())
 
   const student = await UserModel.findOne({ username: studentId })

   if(student){
    const exist=student.tests.find(t => t._id.toString() ===testDetails._id.toString())
    if(exist){
      return res.status(200).json({ success: true, message: 'Student tests updated successfully' });
    }
   }

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Update the tests array for the found student
    student.tests.push(testDetails);

    // Save the updated student in the database
    

    
    await student.save();

    return res.status(200).json({ success: true, message: 'Student tests updated successfully' });
  } catch (error) {
    console.error('Error updating student tests:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
// Endpoint to fetch test details by username and test ID
app.get('/api/getTestDetails/:username/:testId', async (req, res) => {
  try {
    const { username, testId } = req.params;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ success: false, error: 'User not found' });
    }

    const test = user.tests.find(test => test._id.toString() === testId);
    if (!test) {
      return res.json({ success: false, error: 'Test not found' });
    }

    res.json({ success: true, test });
  } catch (error) {
    console.error('Error fetching test details:', error);
    res.json({ success: false, error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
