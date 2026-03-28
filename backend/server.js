const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 4000;
const dataDir = path.join(__dirname, 'data');
const userFile = path.join(dataDir, 'users.json');

app.use(cors());
app.use(express.json());

function ensureDataStorage() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(userFile)) {
    fs.writeFileSync(userFile, '[]', 'utf8');
  }
}

function loadUsers() {
  ensureDataStorage();
  const raw = fs.readFileSync(userFile, 'utf8') || '[]';
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  ensureDataStorage();
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2), 'utf8');
}

function getNextUserId(users) {
  if (!users.length) return 1;
  return Math.max(...users.map((user) => user.id || 0)) + 1;
}

function sanitizeUser(user) {
  const { passwordHash, ...sanitized } = user;
  return sanitized;
}

function buildUserRecord(body, id) {
  return {
    id,
    firstName: body.firstName || '',
    middleName: body.middleName || '',
    lastName: body.lastName || '',
    suffix: body.suffix || '',
    gender: body.gender || '',
    birthdate: body.birthdate || '',
    username: body.username || '',
    email: body.email || '',
    purok: body.purok || '',
    barangay: body.barangay || '',
    municipality: body.municipality || '',
    province: body.province || '',
    idDocument: body.id || '',
    income: body.income || '',
    billing: body.billing || '',
    securityQuestions: [
      { question: body.question1 || '', answer: body.answer1 || '' },
      { question: body.question2 || '', answer: body.answer2 || '' },
      { question: body.question3 || '', answer: body.answer3 || '' },
    ],
    createdAt: new Date().toISOString(),
  };
}

function seedSampleUser() {
  const users = loadUsers();
  if (users.length > 0) {
    return;
  }

  const passwordHash = bcrypt.hashSync('Password123!', 10);
  const sampleUser = buildUserRecord(
    {
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      suffix: 'Jr.',
      gender: 'male',
      birthdate: '1990-01-01',
      username: 'john_doe',
      email: 'john.doe@example.com',
      purok: 'Purok 1',
      barangay: 'San Isidro',
      municipality: 'Makati',
      province: 'Metro Manila',
      id: "Driver's License",
      income: '45000',
      billing: 'Electricity Bill',
      question1: "What is your mother's maiden name?",
      answer1: 'Smith',
      question2: 'What was the name of your first pet?',
      answer2: 'Buddy',
      question3: 'What is the name of your favorite book?',
      answer3: '1984',
    },
    1
  );
  users.push({ ...sampleUser, passwordHash });
  saveUsers(users);
}

app.post('/register', async (req, res) => {
  const body = req.body;
  const requiredFields = ['firstName', 'lastName', 'gender', 'birthdate', 'username', 'email', 'password', 'confirmPassword'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}` });
    }
  }

  if (body.password !== body.confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const users = loadUsers();
  if (users.some((user) => user.username === body.username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  if (users.some((user) => user.email === body.email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = buildUserRecord(body, getNextUserId(users));
  const userRecord = { ...newUser, passwordHash };
  users.push(userRecord);
  saveUsers(users);

  return res.status(201).json({ message: 'Registration successful', user: sanitizeUser(userRecord) });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const users = loadUsers();
  const user = users.find((item) => item.username === username || item.email === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash || '');
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  return res.json({ message: 'Login successful', user: sanitizeUser(user) });
});

app.post('/forgot-password', async (req, res) => {
  const { email, newpassword, confirmpassword } = req.body;
  if (!email || !newpassword || !confirmpassword) {
    return res.status(400).json({ message: 'Email, new password, and password confirmation are required' });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const users = loadUsers();
  const user = users.find((item) => item.email === email);
  if (!user) {
    return res.status(404).json({ message: 'No account found for that email' });
  }

  user.passwordHash = await bcrypt.hash(newpassword, 10);
  saveUsers(users);

  return res.json({ message: 'Password updated successfully' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

ensureDataStorage();
seedSampleUser();

app.listen(PORT, () => {
  console.log(`Backend API is running on http://localhost:${PORT}`);
});
