import Comment from "../services/comment_services.js"

export default class Comments {
    static async getAll(req, res) {
        try {
            let comments = await Comment.getAll(req.params.blogId)
            res.status(200).json(comments)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    static async postComment(req, res) {
        try {
            let { comment, error } = await Comment.postComment(req.user, req.params.blogId, req.body)
            if (error)
                res.status(400).json(error)
            else
                res.status(200).json(comment)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    static async postReply(req, res) {
        try {
            let { comment, error } = await Comment.postReply(req.user, req.params.commentId, req.body)
            if (error)
                res.status(400).json(error)
            else
                res.status(200).json(comment)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }
}