import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server, Socket } from 'socket.io';
import authRoutes from './src/routes/authRoutes';


const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/messenger';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';


// Middleware
app.use(express.json());

// Роуты авторизации
app.use('/api/auth', authRoutes);

// Создание HTTP-сервера и Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

// Обработчик подключений Socket.IO
io.on('connection', (socket: Socket) => {
  console.log('✅ Клиент подключился:', socket.id);

  // Простое тестовое событие
  socket.emit('welcome', {
    message: 'Добро пожаловать в чат!',
    timestamp: new Date()
  });

  // Слушаем сообщения от клиента
  socket.on('client_message', (data) => {
    console.log('📩 Получено сообщение:', data);
    // Отправляем обратно всем клиентам
    io.emit('server_message', {
      ...data,
      from: socket.id,
      timestamp: new Date()
    });
  });

  // Присоединение к комнате
  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
    console.log(`👥 Пользователь ${socket.id} присоединился к комнате ${roomId}`);
    // Уведомляем всех в комнате о новом участнике
    io.to(roomId).emit('user_joined', {
      socketId: socket.id,
      timestamp: new Date()
    });
  });

  // Выход из комнаты
  socket.on('leave_room', (roomId: string) => {
    socket.leave(roomId);
    console.log(`👤 Пользователь ${socket.id} покинул комнату ${roomId}`);
    io.to(roomId).emit('user_left', {
      socketId: socket.id,
      timestamp: new Date()
    });
  });

  socket.on('send_message', (data: { roomId: string; text: string; userId?: string }) => {
  const message = {
    id: Date.now(),
    text: data.text,
    userId: data.userId || 'anonymous',
    timestamp: new Date(),
    roomId: data.roomId
  };

  // Отправляем только участникам комнаты
  io.to(data.roomId).emit('new_message', message);
  console.log(`💬 Сообщение отправлено в комнату ${data.roomId}:`, data.text);
});

  // Отключение клиента
  socket.on('disconnect', () => {
    console.log('❌ Клиент отключился:', socket.id);
  });
});

// Подключение к MongoDB и запуск сервера
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🔗 Подключено к MongoDB');
    server.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`📡 Socket.IO слушает на порту ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Ошибка подключения к MongoDB:', error);
  });
