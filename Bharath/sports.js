const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 8001;
// Connect to MongoDB
// Replace the connection URL with your MongoDB Atlas URL
const mongoURI = 'mongodb+srv://bsohailbasha944:ZF8PPo2WIGiwoBk3@cluster0.uti7bwk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema and model
const userSchema = new mongoose.Schema({
  uname:String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Serve the login.html file as the homepage (root URL)

// Serve the login page at the '/login' URL
// Serve the login page at the '/login' URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/new1.html');
});

 // Register route (handles registration form submission)
 app.post('/register', async (req, res) => {
  const { uname, email, password } = req.body;
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email,uname});
    if (existingUser) {
      return res.send('User already registered.');
    }
    // Create a new user and save it to the database
    const newUser = new User({ uname, email, password });
    await newUser.save();
    // Redirect to the login page after successful registration
    res.redirect('/login'); // You can change the path to '/login' if that's the login page's URL
  } catch (err) {
    res.send('Error during registration process.');
  }
   });
 app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/new1.html');
});

// Login route (handles login form submission)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user in the database based on the provided email
      const user = await User.findOne({ email });
      if (!user) {
        return res.send('User not found.');
      }
      
      // Check if the provided password matches the stored password
      if (user.password !== password) {
        return res.send('Incorrect password.');
      }
      
      // Login successful, redirect to the dashboard page
      res.redirect('/dashboard1');
    } catch (err) {
      res.send('Error during login process.');
    }
  });
  
app.get('/dashboard1', (req, res) => {
res.sendFile(__dirname + '/dash.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
