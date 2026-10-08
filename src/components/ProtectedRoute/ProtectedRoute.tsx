import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../../store";

export const ProtectedRoute = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state?.auth?.user);

  if (user === undefined) {
    // Состояние ещё не готово — показываем лоадер или просто ничего не рендерим
    return null; // или спиннер, если хочешь
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/chat" replace />;
};
