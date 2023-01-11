import MessageServices from "../services/message_services"

export default class Messages {
    static async allMessages(req, res) {
        try {
            let messages = await MessageServices.getAll()
            if (messages == null)
                res.status(204).json({ data: 'no content found' })
            else
                res.status(200).json(messages)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ data: e.message })
        }
    }

    static async oneMessage(req, res) {
        try {
            let message = await MessageServices.getOne(req.params.id)
            if (message == null)
                res.status(204).json({ data: 'no content found' })
            else
                res.status(200).json(message)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ data: e.message })
        }
    }

    static async sendMessage(req, res) {
        try {
            const { email, content } = req.body

            let baby = await MessageServices.sendMessage({ email, content })
            res.status(200).json(baby)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ data: e.message })
        }
    }
}