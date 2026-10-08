import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import styles from "./MessageList.module.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

export const MessageList = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

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
    <List className={styles.messageList}>
      {messages.map((msg) => (
        <ListItem key={msg.id} className={styles.messageItem}>
          <ListItemText
            primary={
              <Typography variant="subtitle2" className={styles.sender}>
                {msg.sender}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" className={styles.text}>
                  {msg.text}
                </Typography>
                <Typography variant="caption" className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
