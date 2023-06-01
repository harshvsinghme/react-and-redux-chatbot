import { createSlice } from "@reduxjs/toolkit";

const botMessages = [
  {
    id: 1,
    sender: "bot",
    content: "...",
    replaceBy: "Hello, Welcome to student info system!",
  },
  {
    id: 3,
    sender: "bot",
    content: "...",
    replaceBy: "Enter your Name",
  },
  {
    id: 5,
    sender: "bot",
    content: "...",
    replaceBy: "Enter your Age",
  },
];

const commonSlice = createSlice({
  name: "common",
  initialState: {
    chatTurn: "bot",
    userName: "",
    userAge: "",
    userInputSuccess: false,
    botMessages,
  },
  reducers: {
    inputRecorderSuccess(state) {
      state.userInputSuccess = true;
    },
    resetEverything(state) {
      state.chatTurn = "bot";
      state.userName = "";
      state.userAge = "";
      state.userInputSuccess = false;
      state.botMessages = botMessages;
    },
    alterChatTurn(state) {
      if (state.chatTurn === "user" && state.botMessages.length > 0) {
        state.chatTurn = "bot";
        state.botMessages = state.botMessages.slice(1);
      } else if (state.chatTurn === "bot") {
        state.chatTurn = "user";
      }
    },
  },
});

export const { alterChatTurn, resetEverything, inputRecorderSuccess } =
  commonSlice.actions;
export default commonSlice.reducer;
