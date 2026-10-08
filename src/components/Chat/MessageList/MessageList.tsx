import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./MessageList.module.css";
import { List, ListItem, ListItemText, Typography, Fade } from "@mui/material";
import type { RootState } from "../../../store";

export const MessageList = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className={styles.messageList}>
        <Typography variant="body1" className={styles.noMessages}>
          Пока нет сообщений
        </Typography>
      </div>
    );
  }

  return (
    <List className={styles.messageList} ref={listRef}>
      {messages.map((msg, index) => (
        <Fade in={true} timeout={500 + index * 100} key={msg.id}>
          <ListItem key={msg.id} className={styles.messageItem}>
            <ListItemText
              primary={msg.sender}
              secondary={
                <>
                  <Typography
                    variant="body2"
                    display="block"
                    className={styles.text}
                  >
                    {msg.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className={styles.timestamp}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Fade>
      ))}
    </List>
  );
};
