import Post from '../models/post.js'
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler("You are not allowed to create a post"))

    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler("Please fill all the required fields"))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '')
    const post = new Post({
        ...req.body,
        slug,
        userID: req.user.userId
    }
    )
    try {
        const savedPost = await post.save()
        res.status(201).json(savedPost)
    }
    catch (err) {
        next(err)
    }

}

export const getpost = async (req, res, next) => {

    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0
        const direction = req.query.sort === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userID: req.query.userId }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: direction })
            .skip(startIndex)
            .limit(limit);

        const TotalPost = await Post.countDocuments()

        const now = new Date()
        const LastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const LastMonthPost = await Post.countDocuments({
            createdAt: {
                $gte: LastMonth
            }
        })
        return res.status(200).json({
            posts,
            TotalPost,
            LastMonthPost

        })

    }
    catch (err) {
        next(err)
    }
}



export const deletepost = async (req, res, next) => {
    if (req.user.userId != req.params.uId && !req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to delete this post"))
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        return res.status(200).json({ message: "Post deleted successfully" })
    }
    catch (err) {
        next(err)
    }

}

export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.userId !== req.params.uId) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    imgURL: req.body.imgURL,
                },
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};