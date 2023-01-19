import { User, validate as Validate_User } from "../models/user_model.js";

export default class UserServices {
    static async login(data) {
        try {
            const { email, password } = data
            if (email == undefined || password == undefined)
                return await { error: { message: "bad request" } }
            else {
                const check = await User.findOne({ email: email })
                if (check == null)
                    return { info: { message: "user not found" } }

                else if (check.password != password)
                    return { info: { message: "user not found" } }
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

            const { error, value } = await Validate_User({ email, username, password })
            if (error)
                return { error }

            const check = await User.findOne({ username: username })
            if (check !== null)
                return { error: { message: "username exist" } }

            const baby = await User.create(value)

            return { error: undefined, baby }
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

            if (check.password !== password)
                return { info: { message: "not authorized" } }

            const deleted = await User.findByIdAndDelete(check._id)
            return { deleted }
        }
        catch (e) {
            console.log(e)
            return { error: e }
        }
    }
}