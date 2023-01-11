import Message from "../models/message_model";

export default class MessageServices {
    static async sendMessage(data) {
        try {
            let baby = await Message.create(data)
            return baby
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getAll() {
        try {
            return await Message.find({})
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getOne(id) {
        try {
            let one = await Message.findById(Object(id))
            return one
        }
        catch (e) {
            console.log(e)
        }
    }
}