import PostModel from "../Models/postModel.js";

// create new post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json({ success: true, message: "Post created!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json({ success: true, message: "Post updated!" });
    }
    return res.status(403).json({ success: false, message: "Action forbiden!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
