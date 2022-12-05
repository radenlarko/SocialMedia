import express from "express";
const router = express.Router();
import { uploadFile } from "../Controllers/UploadControllers.js";

router.post("/", uploadFile);

export default router;
