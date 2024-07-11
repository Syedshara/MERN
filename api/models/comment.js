import mongoose from "mongoose";

const model = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
    , userId: {
        type: String,
        required: true,

    },
    likes: {
        type: Array,
        default: []
    },
    noLikes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', model)

export default Comment; 