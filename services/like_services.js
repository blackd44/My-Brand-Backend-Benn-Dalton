import { Blog } from "../models/blog_model.js"
import { Comment } from "../models/comment_model.js"

export default class Likes {
    static async likeBlog(blogId, user) {
        let blog = await Blog.findById(blogId).select('likes')
        if (blog == null) return { error: { message: `blog with Id "${blogId}" not found` } }
        if (user == null || user._id == undefined) return { error: { message: `user not found` } }

        let message = undefined
        let index = blog.likes.indexOf(user._id)
        if (index == -1) {
            blog.likes.push(user._id)
            message = 'blog liked'
        }
        else {
            blog.likes.splice(index, 1)
            message = 'blog unliked'
        }

        await blog.save()
        return { value: { blog, message } }
    }

    static async likeComment(commentId, user) {
        let comment = await Comment.findById(commentId).select('likes')
        if (comment == null) return { error: { message: `comment with Id "${commentId}" not found` } }
        if (user == null || user._id == undefined) return { error: { message: `user not found` } }

        let message = undefined
        let index = comment.likes.indexOf(user._id)
        if (index == -1) {
            comment.likes.push(user._id)
            message = 'comment liked'
        }
        else {
            comment.likes.splice(index, 1)
            message = 'comment unliked'
        }

        await comment.save()
        return { value: { comment, message } }
    }
}