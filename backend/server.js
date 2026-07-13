import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import User from './models/User.js';
import { protect } from './middleware/auth.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-algo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OS Algo Visualizer Backend is running' });
});

// --- Auth Routes ---
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

app.post('/api/auth/register', authLimiter, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // Advanced Input Validation
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please provide all required fields (username, email, password)');
    }
    if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      res.status(400);
      throw new Error('Password must be at least 6 characters and contain both letters and numbers');
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists with that email or username');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });
    if (user) {
      res.status(201).json({
        _id: user.id, username: user.username, email: user.email, 
        learningProgress: user.learningProgress, unlockedAlgorithms: user.unlockedAlgorithms, token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide both email and password');
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id, username: user.username, email: user.email, 
        learningProgress: user.learningProgress, unlockedAlgorithms: user.unlockedAlgorithms,
        token: generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', protect, async (req, res, next) => {
  try {
    res.json({
      _id: req.user.id, username: req.user.username, email: req.user.email,
      learningProgress: req.user.learningProgress, unlockedAlgorithms: req.user.unlockedAlgorithms
    });
  } catch (error) {
    next(error);
  }
});

// --- Progress & Quiz Routes ---
app.post('/api/progress/update', protect, async (req, res, next) => {
  try {
    const { progress, unlockedAlgorithm } = req.body;
    const user = await User.findById(req.user.id);
    if (user) {
      if (progress !== undefined) user.learningProgress = progress;
      if (unlockedAlgorithm && !user.unlockedAlgorithms.includes(unlockedAlgorithm)) {
        user.unlockedAlgorithms.push(unlockedAlgorithm);
      }
      await user.save();
      res.json({ message: 'Progress updated', learningProgress: user.learningProgress, unlockedAlgorithms: user.unlockedAlgorithms });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
});

app.get('/api/progress', protect, async (req, res, next) => {
  try {
    res.json({ learningProgress: req.user.learningProgress, unlockedAlgorithms: req.user.unlockedAlgorithms });
  } catch (error) {
    next(error);
  }
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
app.post('/api/ai/explain', async (req, res, next) => {
  try {
    const { stateContext, question } = req.body;
    
    setTimeout(() => {
      res.json({
        explanation: `(Mock AI Response) Based on the current time t=${stateContext.time}, the process ${stateContext.cpu || 'none'} is in the CPU because it has the highest priority or shortest remaining time in the ${stateContext.algorithm} algorithm.`
      });
    }, 1500);

  } catch (error) {
    res.status(500);
    next(new Error('Failed to fetch AI explanation'));
  }
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
