import { Schema, model } from "mongoose";
import validate from "../validations/blog_validator.js";

const ownerSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    username: {
        type: String
    }
}, { _id: false })

const commentSchema = new Schema({
    owner: ownerSchema,
    message: {
        type: String,
        min: 5,
        require: true,
    },
    replies: [{
        owner: ownerSchema,
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
    owner: ownerSchema,
    content: {
        type: String,
        required: true,
    },
    comments: [commentSchema]
}, { timestamps: true })

const Blog = model('blog', blogSchema)
export { Blog, validate }