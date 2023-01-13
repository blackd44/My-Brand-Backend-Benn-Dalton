import { Schema, model } from "mongoose";
import validate from "../validations/message_validator.js";

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

export { Message, validate }