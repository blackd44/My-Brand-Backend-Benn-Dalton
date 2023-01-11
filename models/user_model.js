import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
}, { timestamps: true })

const User = new model('user', userSchema)