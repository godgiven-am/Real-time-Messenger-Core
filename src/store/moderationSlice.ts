import { createSlice } from "@reduxjs/toolkit";

interface ModerationState {
  hiddenMessages: string[];
  stats: {
    totalMessages: number;
    hiddenMessages: number;
  };
}

const initialState: ModerationState = {
  hiddenMessages: [],
  stats: { totalMessages: 0, hiddenMessages: 0 },
};

const moderationSlice = createSlice({
  name: "moderation",
  initialState,
  reducers: {
    hideMessage: (state, action) => {
      const messageId = action.payload;
      if (!state.hiddenMessages.includes(messageId)) {
        state.hiddenMessages.push(messageId);
        state.stats.hiddenMessages += 1;
      }
    },
    updateStats: (state, action) => {
      Object.assign(state.stats, action.payload);
    },
  },
});

export const { hideMessage, updateStats } = moderationSlice.actions;
export default moderationSlice.reducer;
