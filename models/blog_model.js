import { Schema, model } from "mongoose";
import validate from "../validations/blog_validator.js";

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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
}, { timestamps: true })

const Blog = model('blog', blogSchema)
export { Blog, validate }