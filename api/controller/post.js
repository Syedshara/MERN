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

