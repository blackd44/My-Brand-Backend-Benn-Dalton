import { User } from "../models/user_model.js"
import { Blog, validate as Validate_Blog } from "../models/blog_model.js"
import mongoose from "mongoose"
let ObjectId = mongoose.Types.ObjectId

export default class BlogServices {
    static async getBlogs() {
        try {
            let blogs = await Blog.find({}).populate('owner', 'username email profile -_id').select('-comments -__v')
            return { blogs }
        }
        catch (e) {
            console.log({ error: e.message })
            return { error: e }
        }
    }

    static async getSingleBlog(id) {
        try {
            let blog = await Blog.findById(ObjectId(id)).populate([
                {
                    path: 'owner', 
                    select: 'username email profile -_id'
                },
                {
                    path: 'likes',
                    select: '-_id email'
                }
            ]).select('-comments -__v')
            if (blog == null)
                return { error: "not found" }
            return { blog }
        }
        catch (e) {
            console.log({ error: e.message })
            return { error: e }
        }
    }

    static async deleteSingleBlog(id, user) {
        try {
            if (!user)
                return { info: "user not found" }

            let blog = await Blog.findByIdAndDelete(ObjectId(id)).populate([
                {
                    path: 'owner', 
                    select: 'username email profile -_id'
                },
                {
                    path: 'likes',
                    select: '-_id email'
                }
            ]).select('-comments -__v')
            if (blog == null)
                return { error: "not found" }
            return { blog }
        }
        catch (e) {
            console.log({ error: e.message })
            return { error: e }
        }
    }

    static async postBlog(data) {
        try {
            const { body, user: { username } } = data
            const { content, image, title } = body
            let user = await User.findOne({ username })
            if (!user)
                return { info: { message: "user not found" } }

            let { error, value } = await Validate_Blog({ owner: (user._id + ''), content, image, title })
            if (error)
                return { error }

            let baby = await (await Blog.create(value)).populate([
                {
                    path: 'owner', 
                    select: 'username email profile -_id'
                },
                {
                    path: 'likes',
                    select: '-_id email'
                }
            ])
            return { baby }
        }
        catch (e) {
            console.log({ error: e.message })
            return { error: e }
        }
    }

    static async updateBlog(data, O) {
        try {
            const { username } = O
            const { body, params: { id } } = data
            let user = await User.findOne({ username }).select('username email -_id')
            if (!user)
                return { info: "not found authorized" }

            let old = await Blog.findById(ObjectId(id)).select('-comments')
            if (old == null)
                return { error: "not found" }
            /*
            if(old.owner.email != user.email)
                return { info: "not found authorized" }
            */

            for (let key in body) {
                if (["_id", "owner", "createdAt"].includes(key) && old[key] != body[key])
                    return { info: { message: `"${key}" can't be changed` } }
                else old[key] = body[key]
            }

            let { title, owner, comments, image, content } = old
            let { error, value } = await Validate_Blog({ title, owner: (owner + ''), comments, image, content })
            if (error)
                return { info: error }
            await (await old.save()).populate([
                {
                    path: 'owner', 
                    select: 'username email profile -_id'
                },
                {
                    path: 'likes',
                    select: '-_id email'
                }
            ])
            return { baby: old }
        }
        catch (e) {
            console.log({ error: e.message })
            return { error: e }
        }
    }
}