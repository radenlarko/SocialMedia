import API from "./api";

export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = () => API.post("/message");
