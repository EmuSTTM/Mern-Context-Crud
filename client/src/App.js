import { PostForm, HomePage, NotFoundPage } from './pages'
import { Routes, Route } from 'react-router-dom';
import { PostContainer} from './context/postContext';

function App() {
  return (
    <PostContainer>
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/new' element={<PostForm/>} />
      <Route path='/*' element={<NotFoundPage/>} />
    </Routes>
    </PostContainer>
  );
}

export default App;
