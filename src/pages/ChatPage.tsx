import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setUsersOnline } from "../store/chatSlice";
import { useSocket } from "../hooks/useSocket";
import { MessageList } from "../components/Chat/MessageList";
import { MessageInput } from "../components/Chat/MessageInput";
import type { RootState } from "../store";
import styles from "./ChatPage.module.css";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const usersOnline = useSelector((state: RootState) => state.chat.usersOnline);

  const socket = useSocket("ws://localhost:3001");

  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (msg: any) => dispatch(addMessage(msg)));
    socket.on("users_online", (users: string[]) =>
      dispatch(setUsersOnline(users)),
    );

    return () => {
      socket?.off("new_message");
      socket?.off("users_online");
    };
  }, [socket, dispatch]);

  return (
    <div className={styles.chatPage}>
      <div className={styles.onlineStatus}>
        <span className={styles.onlineText}>
          Онлайн: {usersOnline.join(", ") || "Никто"}
        </span>
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};
