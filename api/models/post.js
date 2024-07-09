import mongoose from "mongoose";

const model = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    , title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        default: "https://www.travelpayouts.com/blog/wp-content/uploads/2021/02/blog-images.png"

    }
}, { timestamps: true })

const Post = mongoose.model('Post', model)

export default Post; 