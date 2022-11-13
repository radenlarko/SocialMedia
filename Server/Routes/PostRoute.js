import express from "express";
import { createPost } from "../Controllers/PostControllers.js";

const router = express.Router();
router.post("/", createPost);

export default router;
