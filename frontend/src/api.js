import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/slack" });

export const sendMessage = (data) => API.post("/send", data);
export const getMessages = () => API.get("/messages");
export const getMessageByTs = (ts) => API.get(`/message/${ts}`);
export const getLocalMessages = () => API.get("/local");
export const updateMessage = (data) => API.put("/update", data);
export const deleteMessage = (data) => API.delete("/delete", { data });
