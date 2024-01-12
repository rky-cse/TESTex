
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    console.log(`Couldn't connect to the database`);
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

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // If the username already exists, return an error response
      return res.status(400).json({ message: 'Username already exists' });
    }

    // If the username is unique, create a new user with hashed password
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Error creating user' });
  }
});




// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    console.log('User from database:', user);

    if (user && bcrypt.compareSync(password, user.password)) {
      // Passwords match, user is authenticated
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Error during login' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




