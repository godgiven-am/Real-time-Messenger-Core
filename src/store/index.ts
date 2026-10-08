import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import moderationReducer from './moderationSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    moderation: moderationReducer,
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;