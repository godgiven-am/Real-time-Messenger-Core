import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { clearError, login } from "../../store/authSlice";

// Схема валидации Zod
const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Если пользователь уже авторизован, перенаправляем
    if (user) {
      window.location.href = "/chat";
    }
  }, [user]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  // Очищаем ошибку при вводе
  const handleInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1">
            Вход в мессенджер
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange();
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Пароль"
                variant="outlined"
                sx={{ mt: 2 }}
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange();
                }}
              />
            )}
          />

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={status === "loading"}
              fullWidth
            >
              {status === "loading" ? "Вход..." : "Войти"}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => (window.location.href = "/register")}
              fullWidth
            >
              Регистрация
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              alert("Фdsddsds");
            }}
            sx={{ cursor: "pointer" }}
          >
            Забыли пароль?
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};
