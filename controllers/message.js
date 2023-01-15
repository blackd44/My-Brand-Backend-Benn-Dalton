import MessageServices from "../services/message_services.js"

export default class Messages {
    static async allMessages(req, res) {
        try {
            let messages = await MessageServices.getAll()
            if (messages == null)
                res.status(204).json({ error: 'no content found' })
            else
                res.status(200).json(messages)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    }

    static async oneMessage(req, res) {
        try {
            let message = await MessageServices.getOne(req.params.id)
            if (message == null)
                res.status(204).json({ error: 'no content found' })
            else
                res.status(200).json(message)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    }

    static async sendMessage(req, res) {
        try {
            const { email, content } = req.body

            let { error, baby } = await MessageServices.sendMessage({ email, content })
            if (error)
                res.status(422).json({ error: error.message })

            res.status(200).json(baby)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    }

    static async deleteMessage(req, res) {
        try {
            let message = await MessageServices.deleteOne(req.params.id)
            if (message == null)
                res.status(204).json({ error: 'no content found' })
            else
                res.status(200).json({ deleted: message })
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    }

    static async updateMessage(req, res) {
        try {
            let { updated, error } = await MessageServices.updateOne(req.params.id, req.body)
            if (updated == null)
                res.status(204).json({ error: 'no content found' })
            else {
                if (error) res.status(422).json({ error: error.message })
                else
                    res.status(200).json({ updated: updated })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    }
}