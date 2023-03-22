import { useState, createContext, useContext, useEffect } from "react";
import { getPostsRequest, createPostRequest } from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Aquí nos vamos a comunicar con el back-end a
  // través de axios.
  const getPosts = async () => {
    const res = await getPostsRequest();
    setPosts(res);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const createPost = async (post) => {
    const res = await createPostRequest(post);
    setPosts([...posts, res]);
  };

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
