import { Schema, model } from "mongoose";
import validate from "../validations/user_validator.js";

const userSchema = new Schema({
    username: {
        type: String,
        min: 3,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profile: String
}, { timestamps: true })

const User = model('user', userSchema)

export { User, validate }