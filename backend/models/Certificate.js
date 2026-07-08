import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Optional because guests can also get certificates
  },
  guestName: {
    type: String,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
