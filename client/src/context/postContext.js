import { useState, createContext, useContext  } from 'react'

const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext);
    return context;
}

export const PostContainer = ({children}) => {
    
    const [posts, setPosts] = useState([])
    console.log(posts)
    return <postContext.Provider value={{
        posts,
    }}>
        {children}
    </postContext.Provider>

}

