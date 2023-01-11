import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    email: String,
    content: String
}, { timestamps: true })

const Message = model('blog', messageSchema)

export default Message