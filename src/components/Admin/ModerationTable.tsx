import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import styles from "./ModerationTable.module.css";

export const ModerationTable = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const hiddenMessages = useSelector(
    (state: RootState) => state.moderation.hiddenMessages,
  );

  const toggleMessageVisibility = (messageId: string) => {
    console.log("Toggle visibility:", messageId);
  };

  return (
    <div className={styles.moderationTable}>
      <h2 className={styles.tableTitle}>Панель модерации</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Отправитель</th>
              <th className={styles.tableHeader}>Сообщение</th>
              <th className={styles.tableHeader}>Время</th>
              <th className={styles.tableHeader}>Статус</th>
              <th className={styles.tableHeader}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{msg.sender}</td>
                <td className={styles.tableCell}>{msg.text}</td>
                <td className={styles.tableCell}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </td>
                <td className={styles.tableCell}>
                  <span
                    className={
                      hiddenMessages.includes(msg.id)
                        ? styles.statusHidden
                        : styles.statusVisible
                    }
                  >
                    {hiddenMessages.includes(msg.id) ? "Скрыто" : "Видно"}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <button
                    onClick={() => toggleMessageVisibility(msg.id)}
                    className={styles.actionButton}
                  >
                    {hiddenMessages.includes(msg.id) ? "Показать" : "Скрыть"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
