import { Box, Typography, Icon } from "@mui/material";
import { Wifi as WifiIcon, WifiOff as WifiOffIcon } from "@mui/icons-material";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={2}
      py={1}
      bgcolor={isConnected ? "success.light" : "error.light"}
      color={isConnected ? "success.dark" : "error.dark"}
      borderRadius={1}
    >
      <Icon sx={{ fontSize: "1.2rem" }}>
        {isConnected ? <WifiIcon /> : <WifiOffIcon />}
      </Icon>
      <Typography variant="body2" fontWeight="medium">
        {isConnected ? "Подключено" : "Отключено"}
      </Typography>
    </Box>
  );
};
