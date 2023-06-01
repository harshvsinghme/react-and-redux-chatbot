import { createSlice } from "@reduxjs/toolkit";
import { EInputType, TMessage } from "../utils/types";

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

const userInputs = [
  {
    id: 2,
    type: EInputType.button,
  },
  {
    id: 4,
    type: EInputType.textInput,
  },
  {
    id: 6,
    type: EInputType.dropdown,
  },
];

const messages: TMessage[] = [];

const commonSlice = createSlice({
  name: "common",
  initialState: {
    chatTurn: "bot",
    userName: "",
    userAge: 0,
    botMessages,
    userInputs,
    messages,
  },
  reducers: {
    saveInput(state: any, action) {
      const { key, value }: { key: string; value: string } = action.payload;
      if (key && value) state[key] = value;
    },
    resetEverything(state) {
      state.chatTurn = "bot";
      state.userName = "";
      state.userAge = 0;
      state.botMessages = botMessages;
      state.userInputs = userInputs;
      state.messages = [];
    },
    addMessage(state, action: any) {
      state.messages = [...state.messages, action.payload];
    },
    setMessages(state, action: any) {
      state.messages = action.payload;
    },
    alterChatTurn(state) {
      if (state.chatTurn === "user") {
        state.chatTurn = "bot";
        state.userInputs = state.userInputs.slice(1);
      } else if (state.chatTurn === "bot") {
        state.chatTurn = "user";
        state.botMessages = state.botMessages.slice(1);
      }
    },
  },
});

export const {
  alterChatTurn,
  resetEverything,
  saveInput,
  addMessage,
  setMessages,
} = commonSlice.actions;
export default commonSlice.reducer;
