import API from "./api";

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const token = JSON.parse(profile).token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
