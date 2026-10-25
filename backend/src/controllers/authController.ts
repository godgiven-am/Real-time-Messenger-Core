import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

// Регистрация
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    console.log('[BACKEND] Register attempt:', email);
    // Проверка на существование пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Создание пользователя
    const user = new User({ email, password, name });
    await user.save();
    // Генерация токена
    const token = generateToken(user);
    console.log('[BACKEND] User registered:', user._id);
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    console.error('[BACKEND] Auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Вход
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('[BACKEND] Login attempt:', email);
    // Поиск пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Генерация токена
    const token = generateToken(user);
    console.log('[BACKEND] Login success:', user._id);
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    console.error('[BACKEND] Auth error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
