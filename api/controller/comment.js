import Comment from '../models/comment.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const createComment = async (req, res, next) => {
    if (req.user.userId != req.body.userId) {
        return next(errorHandler(401, 'Not authorized to create comment'))
    }
    const { userId, postId, comment } = req.body;
    try {
        const newComment = new Comment({ userId, postId, comment });
        await newComment.save();
        res.status(201).json({ newComment });
    } catch (error) {
        next(error);
    }

}