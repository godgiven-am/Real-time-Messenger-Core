import jwt from 'jsonwebtoken';

import { IUser } from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


export const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
