import { Schema, model } from "mongoose";
import validate from "../validations/blog_validator.js";
import Validate_Comment from "../validations/comment_validator.js";

const commentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        unmodifiable: true
    },
    message: {
        type: String,
        min: 5,
        require: true,
    },
    replies: [{
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            unmodifiable: true
        },
        message: {
            type: String,
            min: 5,
            require: true,
        },
    }]
}, { timestamps: true })

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        unmodifiable: true
    },
    content: {
        type: String,
        required: true,
    },
    comments: [commentSchema]
}, { timestamps: true })

const Blog = model('blog', blogSchema)
const Comment = model('comment', commentSchema)
export { Blog, validate, Comment, Validate_Comment }