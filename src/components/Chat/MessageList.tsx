import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import styles from "./MessageList.module.css";

export const MessageList = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  if (messages.length === 0) {
    return <div className={styles.messageList}>Пока нет сообщений</div>;
  }

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <div key={msg.id} className={styles.messageItem}>
          <div className={styles.sender}>{msg.sender}</div>
          <div className={styles.text}>{msg.text}</div>
          <div className={styles.timestamp}>
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};
