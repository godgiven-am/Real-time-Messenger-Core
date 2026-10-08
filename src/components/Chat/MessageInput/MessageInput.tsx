import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../store/chatSlice";
import { v4 as uuidv4 } from "uuid";
import styles from "./MessageInput.module.css";
import { Box, TextField, Button } from "@mui/material";

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={styles.messageInputForm}
    >
      <Box display="flex" gap={2} className={styles.inputContainer}>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
          variant="outlined"
          size="medium"
          className={styles.messageInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.sendButton}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};
