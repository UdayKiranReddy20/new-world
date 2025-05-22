const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
const users = [
  { username: 'demo', password: 'password', interests: ['Environmentalism', 'Education', 'Health & Wellness'], donations: ['Clean Water Campaign', 'Tree Planting Event'], badges: ['Eco Warrior', 'Community Hero'], points: 150 }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: `Welcome, ${username}!`, user });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// User data endpoint
app.get('/api/user/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(u => u.username === username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 