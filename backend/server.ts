import app from './src/app/app';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './src/routes/authRoutes';

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/messenger';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('join-room', (roomId: string, userId: string) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
      });

      socket.on('send-message', (data: { roomId: string; text: string; userId: string }) => {
        io.to(data.roomId).emit('new-message', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on port \${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
