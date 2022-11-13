import express from "express";
import {
  createPost,
  deletePost,
  disLikePost,
  getPost,
  likePost,
  updatePost,
} from "../Controllers/PostControllers.js";

const router = express.Router();
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.put("/:id/dislike", disLikePost);

export default router;
