import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendMessageAPI,
  fe,
  getListMessageAPI,
  fetchMessagesAPI,
  sendFileMessageAPI,
} from "../utils/api/MessageAPI";
export const sendMessage = createAsyncThunk("sendMessage", async (params) => {
  try {
    const { conversationId, content } = params;
    const messages = await sendMessageAPI(conversationId, content);
    return messages;
  } catch (error) {
    console.log(error);
  }
});
export const sendFileMessage = createAsyncThunk("sendFileMessage", async(params) =>{
  try {
    const { conversationId, files } = params;
    const message = await sendFileMessageAPI(conversationId, files);
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
})
export const fetchMessages = createAsyncThunk(
  "fetchMessages",
  async (params) => {
    try {
      const listMessages = await fetchMessagesAPI(params);
      return listMessages;
    } catch (error) {
      console.log(error);
    }
  }
);
const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    listMessage: [],
    selectedMessage: {},
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoader = false;
      state.listMessage.push(action.payload);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
    // get list
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.isLoader = false;
      state.listMessage = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
    // send file message
    builder.addCase(sendFileMessage.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(sendFileMessage.fulfilled, (state, action) => {
      state.isLoader = false;
      state.listMessage.push(action.payload);
      console.log(action.payload);
    });
    builder.addCase(sendFileMessage.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  }
});

export default MessageSlice.reducer;