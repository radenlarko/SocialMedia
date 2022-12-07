import API from "./api";

export const userChats = (id) => API.get(`/chat/${id}`);
