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
    if (!post.userId) {
      return res
        .status(404)
        .json({ success: false, message: "Post does not exist!" });
    }
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json({ success: true, message: "Post updated!" });
    }
    return res
      .status(403)
      .json({ success: false, message: "Action forbiden!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.userId) {
      return res
        .status(404)
        .json({ success: false, message: "Post does not exist!" });
    }
    if (post.userId === userId) {
      await post.deleteOne();
      return res.status(200).json({ success: true, message: "Post deleted!" });
    }
    return res
      .status(403)
      .json({ success: false, message: "Action forbiden!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// like a post
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      return res.status(200).json({ success: true, message: "Post liked" });
    }

    return res
      .status(403)
      .json({ success: false, message: "Post is Already liked by you!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// dislike a post
export const disLikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({ success: true, message: "Post disliked" });
    }

    return res
      .status(403)
      .json({ success: false, message: "Post is not liked by you!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
