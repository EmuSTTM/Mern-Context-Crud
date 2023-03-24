import axios from "axios";

export const getPostsRequest = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const createPostRequest = async (post) => {
  const response = await axios.post("/posts", post);
  return response.data;
};

export const deletePostRequest = async (id) => {
  const response = await axios.delete(`/posts/${id}`);
  return response;
};


export const getPostRequest = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

export const updatePostRequest = async (id, newFields) => {
  const response = axios.put(`/posts/${id}`, newFields);
  return response;
};