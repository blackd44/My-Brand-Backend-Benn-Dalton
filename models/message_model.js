import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Message = model('message', messageSchema)

export default Message