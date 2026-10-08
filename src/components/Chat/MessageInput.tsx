import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/chatSlice";
import { v4 as uuidv4 } from "uuid";
import styles from "./MessageInput.module.css";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      id: uuidv4(),
      text,
      sender: "You",
      timestamp: Date.now(),
    };

    dispatch(addMessage(newMessage));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.messageInputForm}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          Отправить
        </button>
      </div>
    </form>
  );
};
