import { useState, createContext, useContext, useEffect } from "react";
import { 
  getPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest
} from "../api/posts";

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

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204){
      setPosts(posts.filter((post) => post._id !== id));
    }
    
  }

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res;
  }

  const updatePost = async (id, post) => {
    const res = await updatePostRequest(id, post);
    setPosts(posts.map( post => post._id === id ? res.data : post))
  }

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
