import API from "./api";

export const uploadImage = (data) =>
  API.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const uploadPost = (data) => API.post("/post", data);
