import { User } from "../models/user_model.js"
import { Blog, validate as Validate_Blog } from "../models/blog_model.js"
import mongoose from "mongoose"
let ObjectId = mongoose.Types.ObjectId

export default class BlogServices {
    static async getBlogs() {
        try {
            let blogs = await Blog.find({})
            return blogs
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }

    static async getSingleBlog(id) {
        try {
            let blog = await Blog.findById(ObjectId(id))
            if (blog == null)
                return { error: "not found" }
            return { blog }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }

    static async deleteSingleBlog(id, user) {
        try {
            if (!user)
                return { info: "user not found" }

            let blog = await Blog.findByIdAndDelete(ObjectId(id))
            if (blog == null)
                return { error: "not found" }
            return { blog }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }

    static async postBlog(data) {
        try {
            const { body, user: { username } } = data
            const { content, image, title } = body
            let user = await User.findOne({ username })
            if (!user)
                return { error: { message: "user not found" } }

            let { error, value } = await Validate_Blog({ owner: { email: user.email, username: user.username }, content, image, title })
            if (error)
                return { error }

            let baby = await Blog.create(value)
            return { baby }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }
}