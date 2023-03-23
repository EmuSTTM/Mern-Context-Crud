const Post = require("../models/Post");
const { uploadImage, deleteImage } = require("../libraries/cloudinary");
const fs = require("fs-extra");



exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res, next) => {
  const { title, description } = req.body;

  if (title && description) {
    const post = new Post({ title, description });
    if(req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      post.image = {
        url : result.secure_url,
        public_id : result.public_id
      };
      fs.remove(req.files.image.tempFilePath)
    }
    await post.save();
    res.json(post);
  } else {
    res.send("No ha ingresado los parámetros obligatorios");
  }
};

exports.updatePost = async (req, res, next) => {
  const { title, description } = req.body;

  if (title && description) {
    const post = new Post({ title, description, _id: req.params.id});
    if(req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      post.image = {
        url : result.secure_url,
        public_id : result.public_id
      };
      fs.remove(req.files.image.tempFilePath)
    }
    
    await Post.findByIdAndUpdate(req.params.id, post , {});
    res.json(post);
  } else {
    res.send("No ha ingresado los parámetros obligatorios");
  }
};

exports.deletePost = async (req, res, next) => {
  try{
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (postRemoved && postRemoved.image.public_id){
      await deleteImage(postRemoved.image.public_id)
    }
    if(!postRemoved) return res.sendStatus(404);
    res.sendStatus(204);
    
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
  
};

exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.sendStatus(404);
  return res.json(post);
};
