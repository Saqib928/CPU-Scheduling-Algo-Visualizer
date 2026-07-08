import mongoose from 'mongoose';

const quizSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizType: {
    type: String,
    required: true,
    enum: ['FCFS', 'SJF', 'SRTF', 'Priority', 'RR', 'Final'],
  },
  score: {
    type: Number,
    required: true,
  },
  correctCount: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const QuizSession = mongoose.model('QuizSession', quizSessionSchema);
export default QuizSession;
