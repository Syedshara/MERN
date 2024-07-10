import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getpost, deletepost, updatepost } from "../controller/post.js";

const router = express.Router();

router.post("/create", verifyToken, create)
router.get("/getpost", getpost)
router.delete("/deletepost/:postId/:uId", verifyToken, deletepost)
router.put("/updatepost/:postId/:uId", verifyToken, updatepost)


export default router