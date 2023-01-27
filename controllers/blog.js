import BlogServices from "../services/blog_services.js"

export default class Blogs {
    static async getAll(req, res) {
        try {
            const { blogs } = await BlogServices.getBlogs()
            if (blogs.length == 0)
                res.status(204).json({ message: 'no content found' })
            else
                res.status(200).json(blogs)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    static async getSingle(req, res) {
        try {
            const { blog, error } = await BlogServices.getSingleBlog(req.params.id)
            if (error)
                res.status(204).json({ message: 'no content found' })
            else
                res.status(200).json(blog)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    static async deleteSingle(req, res) {
        try {
            const { blog, error, info } = await BlogServices.deleteSingleBlog(req.params.id, req.user)
            if (info)
                res.status(401).json({ info })
            else if (error)
                res.status(204).json({ message: 'no content found' })
            else
                res.status(200).json(blog)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    static async postBlog(req, res) {
        try {
            let { body, user } = req
            let { error, baby } = await BlogServices.postBlog({ body, user })
            if (error)
                res.status(400).json({ error })
            else
                res.status(200).json(baby)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }

    static async updateBlog(req, res) {
        try {
            let { baby, error, info } = await BlogServices.updateBlog(req, req.user)
            if (info)
                res.status(401).json({ info })
            else if (error)
                res.status(204).json({ message: 'no content found' })
            else
                res.status(200).json(baby)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e })
        }
    }
}