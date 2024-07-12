
import express from 'express'
import { verifyToken } from "../utils/verifyUser.js";
import { createComment, getComment, getlikes, editLike, deleteLike, getComments } from '../controller/comment.js';
const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getcomment/:postId', getComment);
router.put('/likes/:commentId', verifyToken, getlikes);
router.put('/editcomment/:commentId', verifyToken, editLike);
router.delete('/deletecomment/:commentId', verifyToken, deleteLike);
router.get('/getcomments', verifyToken, getComments);

export default router