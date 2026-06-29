import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OS Algo Visualizer Backend is running' });
});

// Mock Hugging Face Inference API Proxy Route
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { stateContext, question } = req.body;
    
    // Here you would integrate with @huggingface/inference or standard fetch
    // Example:
    // const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', { ... })
    
    // For now, returning a mock response
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
