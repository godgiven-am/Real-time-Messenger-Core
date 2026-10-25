import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setUsersOnline } from "../../store/chatSlice";
import { useSocket } from "../../hooks/useSocket";
import { MessageList } from "../../components/Chat/MessageList/MessageList";
import { MessageInput } from "../../components/Chat/MessageInput/MessageInput";
import { ConnectionStatus } from "../../components/Chat/ConnectionStatus/ConnectionStatus";
import type { RootState } from "../../store";
import styles from "./ChatPage.module.css";
import { Container, Box, Typography } from "@mui/material";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const usersOnline = useSelector((state: RootState) => state.chat.usersOnline);

  const { socket, isConnected } = useSocket("ws://localhost:3001");

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
    <Container maxWidth={false} className={styles.chatPage}>
      {/* Статус подключения */}
      <Box className={styles.connectionStatus}>
        <ConnectionStatus isConnected={isConnected} />
      </Box>

      {/* Статус онлайн */}
      <Box className={styles.onlineStatus}>
        <Typography variant="body1" className={styles.onlineText}>
          Онлайн: {usersOnline.join(", ") || "Никто"}
        </Typography>
      </Box>
      <MessageList />
      <MessageInput />
    </Container>
  );
};
