import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;
