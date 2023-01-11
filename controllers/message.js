export default class Messages {
    static allMessages(req, res) {
        res.json({ data: "messages" })
    }
}