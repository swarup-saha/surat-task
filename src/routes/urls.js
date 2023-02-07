import express from "express";
import { getShortUrl, urlCreate } from "../controllers/urlController.js";

const router = express.Router();

// Short URL Generator
router.post("/short", urlCreate);
router.get("/:urlId", getShortUrl);

export default router;
