
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

mongoose.connect('mongodb://127.0.0.1:27017/OMTMuserDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to the database`);
  })
  .catch((e) => {
    console.error(`Couldn't connect to the database`, e); // Log the error
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'teacher']
  }
});

const User = mongoose.model('User', userSchema);

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





