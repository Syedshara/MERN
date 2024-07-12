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

export const getComment = async (req, res, next) => {
    try {
        const comment = await Comment.find({ postId: req.params.postId })
            .sort({

                createdAt: -1
            })
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        res.status(200).json(comment)
    } catch (error) {
        next(error);
    }

}

export const getlikes = async (req, res, next) => {
    try {
        const comment = await Comment.findById(
            req.params.commentId
        )
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        const checkLike = comment.likes.indexOf(req.user.userId)
        if (checkLike == -1) {
            comment.likes.push(req.user.userId)
            comment.noLikes += 1
        }
        else {
            comment.likes.splice(checkLike, 1)
            comment.noLikes -= 1
        }
        await comment.save()
        res.status(200).json(comment)
    }
    catch (err) {
        next(err)
    }
}
export const editLike = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.userId != req.body.userId) {
        return next(errorHandler(403, 'You are not allowed to edit Comments'))
    }
    try {
        const comment = await Comment.findById(
            req.params.commentId
        )
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                comment: req.body.comment
            },
            {
                new: true
            }
        )
        res.status(200).json(comment)
    }
    catch (err) {
        next(err)
    }

}
export const deleteLike = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.userId != req.body.userId) {
        return next(errorHandler(403, 'You are not allowed to delete Comments'))
    }
    try {
        const comment = await Comment.findById(
            req.params.commentId
        )
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        await Comment.findByIdAndDelete(
            req.params.commentId
        )
        res.status(200).json({ message: 'Comment deleted successfully' })
    }
    catch (err) {
        next(err)
    }


}

export const getComments = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to get  Comments'));
    }
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0
        const direction = req.query.direction === 'asc' ? 1 : -1;
        const comments = await Comment.find()
            .sort({ createdAt: direction })
            .skip(startIndex)
            .limit(limit);

        const TotalComment = await Comment.countDocuments()

        const now = new Date()
        const LastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const LastMonthComment = await Comment.countDocuments({
            createdAt: {
                $gte: LastMonth
            }
        })
        return res.status(200).json({
            comments,
            TotalComment,
            LastMonthComment

        })

    }
    catch (err) {
        next(err)
    }
}
