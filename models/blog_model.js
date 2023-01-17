import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: String,
    email: String,
    content: String
}, { timestamps: true })

const Blog = model('blog', blogSchema)
export { Blog }