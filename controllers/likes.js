import Like from "../services/like_services.js"

export default class Likes {
    static async blogs(req, res) {
        try {
            const { error, value } = await Like.likeBlog(req.params.blogId, req.user)
            if (error) res.status(400).json(error)
            else res.status(200).json(value)
        }
        catch (e) {
            console.log({ error: e })
            res.status(500).json({ error: e })
        }
    }

    static async comments(req, res) {
        try {
            const { error, value } = await Like.likeComment(req.params.commentId, req.user)
            if (error) res.status(400).json(error)
            else res.status(200).json(value)
        }
        catch (e) {
            console.log({ error: e })
            res.status(500).json({ error: e })
        }
    }
}