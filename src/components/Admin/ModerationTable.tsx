import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import styles from "./ModerationTable.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
} from "@mui/material";

export const ModerationTable = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const hiddenMessages = useSelector(
    (state: RootState) => state.moderation.hiddenMessages,
  );

  const toggleMessageVisibility = (messageId: string) => {
    console.log("Toggle visibility:", messageId);
  };

  return (
    <Paper className={styles.moderationTable}>
      <Typography variant="h4" className={styles.tableTitle}>
        Панель модерации
      </Typography>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Отправитель</TableCell>
              <TableCell className={styles.tableHeader}>Сообщение</TableCell>
              <TableCell className={styles.tableHeader}>Время</TableCell>
              <TableCell className={styles.tableHeader}>Статус</TableCell>
              <TableCell className={styles.tableHeader}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id} className={styles.tableRow}>
                <TableCell className={styles.tableCell}>{msg.sender}</TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography noWrap className={styles.tableText}>
                    {msg.text}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Chip
                    label={hiddenMessages.includes(msg.id) ? "Скрыто" : "Видно"}
                    color={
                      hiddenMessages.includes(msg.id) ? "error" : "success"
                    }
                    className={
                      hiddenMessages.includes(msg.id)
                        ? styles.statusHidden
                        : styles.statusVisible
                    }
                  />
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Button
                    onClick={() => toggleMessageVisibility(msg.id)}
                    variant="outlined"
                    size="small"
                    className={styles.actionButton}
                  >
                    {hiddenMessages.includes(msg.id) ? "Показать" : "Скрыть"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
