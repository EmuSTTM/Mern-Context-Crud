const { Router } = require('express') 
const router = Router();

const controllers = require('../controllers/posts.controllers.js');
router.get('/posts', controllers.getPosts)

router.post('/posts', controllers.createPost)

router.put('/posts/:id', controllers.updatePost)

router.delete('/posts/:id', controllers.deletePost)

router.get('/posts/:id', controllers.getPost)
 
module.exports = router;