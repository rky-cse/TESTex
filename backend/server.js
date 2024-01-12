const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb://127.0.0.1:27017/OMTMuserDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log(`connected to db`);
}).catch((e)=>{
    console.log(`couldn't connect`);
})

// Define a simple User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'teacher']
  }
});

const User = mongoose.model('User', userSchema);

// Your routes will go here

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const user = new User({ username, password, role });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  });
  
  // Login route
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password });
      if (user) {
        res.status(200).json({ message: 'Login successful' ,user});
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error during login' });
    }
  });
  
  // ... (remaining code)
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
