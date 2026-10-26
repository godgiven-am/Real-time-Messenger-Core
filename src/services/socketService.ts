import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const socketService = {
  connect: (): Socket => {
    if (!socket) {
      socket = io('http://localhost:3001');

      // Обработчики событий
      socket.on('connect', () => {
        console.log('🟢 Socket подключен успешно');
      });

      socket.on('welcome', (data) => {
        console.log('🎉 Получен приветственный пакет:', data);
      });

      socket.on('server_message', (message) => {
        console.log('💬 Новое сообщение от сервера:', message);
      });
    }
        return socket;
    },
  
    joinRoom: (roomId: string) => {
    socket?.emit('join_room', roomId);
    },

    leaveRoom: (roomId: string) => {
    socket?.emit('leave_room', roomId);
    },

    sendMessage: (roomId: string, text: string, userId?: string) => {
    socket?.emit('send_message', { roomId, text, userId });
    },

  disconnect: () => {
    socket?.disconnect();
    socket = null;
  }
};
