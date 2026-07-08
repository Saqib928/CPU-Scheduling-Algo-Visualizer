import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  learningProgress: {
    type: Number,
    default: 0,
  },
  unlockedAlgorithms: {
    type: [String],
    default: ['FCFS'], // Starting with FCFS unlocked
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
