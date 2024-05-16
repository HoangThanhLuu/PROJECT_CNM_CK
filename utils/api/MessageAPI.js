import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PORT } from "./port";

export async function fetchMessagesAPI(conversationId) {
  const token = await AsyncStorage.getItem("token");
  const response = await axios
    .get(PORT + "/message/list/" + conversationId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.header);
    });
  return response.data.messages;
}
export async function sendMessageAPI(conversationId, content) {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    PORT + "/message/text/" + conversationId,
    { content: content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const message = response.data.message;
  return message;
}

export async function sendFileMessageAPI(conversationId, files) {
  console.log(files);
  const formData = new FormData();
  formData.append("files", {
    uri: files.uri,
    type: files.mimeType,
    name: files.fileName,
  });
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      PORT + "/message/file/" + conversationId,
      formData,
      {
        headers: {
          Accept:"application/json",
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
}
