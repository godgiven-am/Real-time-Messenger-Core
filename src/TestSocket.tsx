import React, { useState, useEffect } from 'react';
import { socketService } from './services/socketService';

export const TestSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = socketService.connect();

    // Слушаем серверные сообщения
    const handleMessage = (data: any) => {
      setMessages(prev => [...prev, `${data.text} (от ${data.from})`]);
    };
    socket.on('server_message', handleMessage);

    return () => {
      socketService.disconnect();
      socket.off('server_message', handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socketService.sendMessage(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔧 Тест Socket.IO</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите тестовое сообщение..."
          style={{ padding: '8px', width: '300px' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '8px 16px', marginLeft: '10px' }}
        >
          Отправить
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>💬 История сообщений:</h3>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};
