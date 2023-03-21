import { usePosts } from '../context/postContext' 
import { Link } from 'react-router-dom'

export function HomePage() {

    const { setPosts} = usePosts()
  return (
    <div>HomePage

    <Link to="/new" className="text-blue-100 block">
        go to new
    </Link>
    <button className="bg-red-100"onClick={()=> setPosts([1, 2,3 ])}>
        add
    </button>
    </div>

    
  )
}

