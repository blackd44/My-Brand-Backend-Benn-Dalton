import { Blog } from "../models/blog_model.js";
import { Comment, Validate_Comment } from "../models/comment_model.js";
import { User } from "../models/user_model.js";

export default class Comments {
    static async getAll(parentID) {
        let parent = await Blog
            .findById(parentID)
            .select('comments')
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'owner',
                        select: '-_id username email profile'
                    },
                    {
                        path: 'replies',
                        populate: {
                            path: 'owner',
                            select: '-_id username email profile'
                        }
                    }
                ]
            })
        let comments = {
            length: parent.comments.length,
            values: parent.comments
        }
        return comments
    }

    static async postComment(user, parentID, body) {
        let owner = await User.findOne({ username: user.username }).select('_id')

        let parent = await Blog.findById(parentID).select('comments')
        if (parent == null)
            return { error: { message: 'Blog not found' } }

        let baby = new Comment({ ...body, owner: owner._id })
        let { error, value } = await Validate_Comment({ message: baby.message, owner: owner._id + '' })
        if (error)
            return { error }

        parent.comments.unshift(baby._id)

        await baby.save()
        await parent.save()
        return {
            comment: {
                comment: await baby.populate('owner', 'username email profile -_id'),
                comments: (await parent.populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        select: '-_id username email profile'
                    }
                })).comments
            }
        }
    }

    static async postReply(user, parentID, body) {
        let owner = await User.findOne({ username: user.username }).select('_id')

        let parent = await Comment.findById(parentID).select('replies')
        if (parent == null)
            return { error: { message: 'Blog not found' } }

        let baby = new Comment({ ...body, owner: owner._id })
        let { error, value } = await Validate_Comment({ message: baby.message, owner: owner._id + '' })

        if (error)
            return { error }

        await parent.replies.unshift(baby._id)
        baby.save()
        parent.save()

        return {
            comment: {
                reply: await baby.populate('owner', 'username email profile -_id'),
                comment: await parent.populate({
                    path: 'replies',
                    populate: {
                        path: 'owner',
                        select: '-_id username email profile'
                    }
                })
            }
        }
    }
}