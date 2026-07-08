import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Placeholder URI)
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/os-algo').then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OS Algo Visualizer Backend is running' });
});

// --- Auth Routes (Placeholder) ---
app.post('/api/auth/register', async (req, res) => {
  // Logic to hash password and save User
  res.json({ message: 'User registered successfully (placeholder)' });
});

app.post('/api/auth/login', async (req, res) => {
  // Logic to verify password and return JWT
  const token = jwt.sign({ id: 'dummy_id' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.json({ token, message: 'Login successful (placeholder)' });
});

// --- Progress & Quiz Routes (Placeholder) ---
app.post('/api/progress/update', async (req, res) => {
  // Logic to update user progress and save QuizSession
  res.json({ message: 'Progress updated successfully' });
});

app.get('/api/progress', async (req, res) => {
  res.json({ learningProgress: 20, unlockedAlgorithms: ['FCFS', 'SJF'] });
});

// --- Certificate Routes (Placeholder) ---
app.post('/api/certificates', async (req, res) => {
  // Generate certificate
  res.json({ certificateId: 'CERT-123456789' });
});

app.get('/api/certificates/verify/:id', async (req, res) => {
  // Verify certificate
  res.json({ valid: true, guestName: 'John Doe', score: 98 });
});

// Mock Hugging Face Inference API Proxy Route
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { stateContext, question } = req.body;
    
    setTimeout(() => {
      res.json({
        explanation: `(Mock AI Response) Based on the current time t=${stateContext.time}, the process ${stateContext.cpu || 'none'} is in the CPU because it has the highest priority or shortest remaining time in the ${stateContext.algorithm} algorithm.`
      });
    }, 1500);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AI explanation' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
