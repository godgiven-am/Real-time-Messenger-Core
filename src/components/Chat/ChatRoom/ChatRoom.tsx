import { useState, useEffect } from 'react';
import { socketService } from '../../../services/socketService';

export const ChatRoom = ({ roomId }: { roomId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = socketService.connect();

    // Присоединяемся к комнате при монтировании компонента
    socketService.joinRoom(roomId);

    // Обработчики событий
    const handleNewMessage = (message: any) => {
      setMessages(prev => [...prev, message]);
    };

    const handleUserJoined = (data: any) => {
      console.log('Новый участник в комнате:', data);
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_joined', handleUserJoined);

    return () => {
      // Покидаем комнату при размонтировании
      socketService.leaveRoom(roomId);
      socket.off('new_message', handleNewMessage);
      socket.off('user_joined', handleUserJoined);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim()) {
      socketService.sendMessage(roomId, input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🗣️ Комната: {roomId}</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          style={{ padding: '8px', width: '300px' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '8px 16px', marginLeft: '10px' }}
        >
          Отправить
        </button>
      </div>
      <div style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        <h3>💬 Сообщения:</h3>
        {messages.map(msg => (
          <div key={msg.id} style={{
            padding: '8px',
            margin: '5px 0',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <strong>{msg.userId}:</strong> {msg.text}
            <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '10px' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
