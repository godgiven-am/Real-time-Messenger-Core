import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { useSocket } from "../hooks/useSocket";
import { MessageList } from "../components/Chat/MessageList";
import type { RootState } from "../store";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const usersOnline = useSelector((state: RootState) => state.chat.usersOnline);

  const socket = useSocket("ws://localhost:3001");

  console.log(messages, "messages");
  console.log(usersOnline, "usersOnline");

  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (msg: any) => dispatch(addMessage(msg)));

    return () => {
      socket?.off("new_message");
    };
  }, [socket, dispatch]);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-200 p-3">
        Онлайн: {usersOnline.join(", ") || "Никто"}
      </div>
      <MessageList />
    </div>
  );
};
