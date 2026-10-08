import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../types";

interface ChatState {
  messages: Message[];
  usersOnline: string[];
}

const initialState: ChatState = { messages: [], usersOnline: [] };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      if (state.messages.length > 200) state.messages.shift();
    },
    setUsersOnline: (state, action: PayloadAction<string[]>) => {
      state.usersOnline = action.payload;
    },
  },
});

export const { addMessage, setUsersOnline } = chatSlice.actions;
export default chatSlice.reducer;
