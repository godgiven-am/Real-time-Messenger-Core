import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const MessageList = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <div key={msg.id} className="p-3 bg-gray-100 rounded-lg max-w-md">
          <div className="font-medium text-gray-900">{msg.sender}</div>
          <div className="text-gray-700">{msg.text}</div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};
