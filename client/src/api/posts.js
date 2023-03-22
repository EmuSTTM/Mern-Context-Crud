import axios from "axios";

export const getPostsRequest = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const createPostRequest = async (post) => {
  const response = await axios.post("/posts", post);
  return response.data;
};
