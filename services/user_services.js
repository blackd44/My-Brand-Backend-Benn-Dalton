import { User, validate as Validate_User } from "../models/user_model.js";
import bcrypt from "bcrypt"

let saltRounds = parseInt(process.env.SALTROUNDS)
const salt = bcrypt.genSaltSync(saltRounds);

export default class UserServices {
    static async login(data) {
        try {
            const { email, password } = data
            if (email == undefined || password == undefined)
                return await { error: { message: "bad request" } }
            else {
                const check = await User.findOne({ email: email })
                if (check == null || !(await bcrypt.compare(password, check.password)))
                    return { info: { message: "email or password is incorrect" } }
                else
                    return { baby: check }
            }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }

    static async createAccout(data) {
        try {
            const { email, username, password } = data

            let { error, value } = await Validate_User({ email, username, password })
            if (error)
                return { error }

            const check = await User.findOne({ username: username })
            if (check !== null)
                return { error: { message: "username exist" } }

            const hash = await bcrypt.hashSync(value.password, salt)

            value.password = hash
            const baby = await User.create(value)

            return { error: undefined, baby }
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getSingleUser(email) {
        try {
            const check = await User.findOne({ email: email })
            if (check == null)
                return { error: { message: "user not found" } }

            return { user: check }
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getUser(data) {
        try {
            const { username } = data

            const check = await User.findOne({ username: username })
            if (check == null)
                return { error: { message: "user not found" } }

            return { user: check }
        }
        catch (e) {
            console.log(e)
        }
    }

    static async updateUser(user, data) {
        try {
            const { username } = user
            if (data.username && data.username != username) {
                const user = await User.findOne({ username: data.username })
                if (user != null)
                    return { error: { message: "username already exist" } }
            }

            const check = await User.findOne({ username: username })
            if (check == null)
                return { error: { message: "user not found" } }

            for (let key in data) {
                if (["_id", "email", "createdAt"].includes(key) && data[key] != check[key]) {
                    return { error: { message: `${key} can't be changed` } }
                }
                else if (key == 'password') check[key] = await bcrypt.hashSync(data.password, salt)
                else check[key] = data[key]
            }
            const { error } = await Validate_User({
                email: check.email,
                username: check.username,
                password: (data.password || 'Strong@Pass.123')
            })
            if (error)
                return { error }
            else {
                check.save()
                return { user: check, error: undefined }
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    static async deleteUser(user, body) {
        try {
            const { username } = user

            if (!username)
                return { info: { message: "not authorized" } }

            if (!body.password)
                return { error: { message: "password is required" } }
            const { password } = body

            const check = await User.findOne({ username: username })
            if (check == null)
                return { error: { message: "user not found" } }

            if (!(await bcrypt.compare(password, check.password)))
                return { info: { message: "not authorized" } }

            const deleted = await User.findByIdAndDelete(check._id)
            return { deleted }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }

    static async deleteUserByEmail(data) {
        try {
            const { user, body, params } = data
            const { username } = user

            if (!username)
                return { info: { message: "not authorized" } }

            if (!body.password)
                return { error: { message: "password is required" } }
            const { password } = body


            const check = await User.findOne({ username: username })
            if (check == null)
                return { error: { message: "user not found" } }

            if (!(await bcrypt.compare(password, check.password)))
                return { info: { message: "not authorized" } }

            const old = await User.findOne({ email: params.email })
            if (old == null)
                return { error: { message: "user not found" } }

            const deleted = await User.findByIdAndDelete(old._id)
            return { deleted }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }
}