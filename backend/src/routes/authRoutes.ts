import express from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Регистрация
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    console.log('[BACKEND] User registered:', user._id);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('[BACKEND] Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Логин
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('[BACKEND] Login attempt:', email);
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('[BACKEND] User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('[BACKEND] Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    console.log('[BACKEND] Login success:', user._id);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('[BACKEND] Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
