const express = require('express');

const app = express();
app.use(express.json());

let users = [
    { id: 1, name: 'Henil', email: 'henil@example.com' },
    { id: 2, name: 'Rudra', email: 'rudra@example.com' },
];

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js Demo API', status: 'running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/users', (req, res) => {
  res.status(200).json({ success: true, count: users.length, data: users });
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.status(200).json({ success: true, data: user });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.status(200).json({ success: true, data: user });
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
  users.splice(index, 1);
  res.status(200).json({ success: true, message: 'User deleted' });
});

app.post('/users/bulk', (req, res) => {
  const newUsers = req.body.users;
  if (!Array.isArray(newUsers) || newUsers.length === 0) {
    return res.status(400).json({ success: false, message: 'Users array is required' });
  }
  const createdUsers = newUsers.map((user, index) => {
    const newUser = { id: users.length + index + 1, name: user.name, email: user.email };
    users.push(newUser);
    return newUser;
  });
  res.status(201).json({ success: true, data: createdUsers });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = { app, server };

