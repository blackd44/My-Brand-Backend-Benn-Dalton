import { Message, validate as Validate_Message } from "../models/message_model.js";

export default class MessageServices {
    static async sendMessage(data) {
        try {
            const { error } = await Validate_Message(data)
            if (error)
                return { error }

            let baby = await Message.create(data)
            return { baby }
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

    static async deleteOne(id) {
        try {
            let one = await Message.findByIdAndDelete(Object(id))
            return one
        }
        catch (e) {
            console.log(e)
        }
    }

    static async updateOne(id, updates) {
        try {
            let son = await Message.findById(Object(id))
            if (son !== null) {
                for (let key in updates) {
                    son[key] = updates[key]
                }
                const { error } = await Validate_Message({ email: son.email, content: son.content })
                if (error)
                    return { error, updated: son }
                else {
                    son.save()
                    return { updated: son }
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}