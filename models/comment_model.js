import { Schema, model } from "mongoose";
import Validate_Comment from "../validations/comment_validator.js";

const commentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        unmodifiable: true
    },
    message: {
        type: String,
        min: 5,
        require: true,
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, { timestamps: true })

const Comment = model('comment', commentSchema)
export { Comment, Validate_Comment }