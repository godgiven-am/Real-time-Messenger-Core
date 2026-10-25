import mongoose from 'mongoose';
import User from '../src/models/User'; 
import 'dotenv/config';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('Connected to MongoDB');

  const user = await User.findOne({ email: 'test@example.com' });
  if (user) {
    console.log('Test user already exists:', user._id);
    return;
  }

  const newUser = await User.create({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  });

  console.log('Created test user:', newUser._id);
  await mongoose.disconnect();
}

seed().catch(console.error);
