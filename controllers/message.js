export default class Messages {
    static allMessages(req, res) {
        res.json({ data: "messages" })
    }

    static sendMessage(req, res) {
        try {
            const { email, content } = req.body
            res.json({ email, content })
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ data: e.message })
        }
    }
}