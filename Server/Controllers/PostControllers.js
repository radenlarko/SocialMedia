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
