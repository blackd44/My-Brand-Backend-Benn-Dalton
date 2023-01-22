import UserServices from "../services/user_services.js";
import jwt from "jsonwebtoken";

export default class Users {
    static async signup(req, res) {
        try {
            const jwtSecret = process.env.JWT_SECRET
            let { error, baby } = await UserServices.createAccout(req.body)
            if (error)
                res.status(400).json({ error })
            else {
                const { username } = baby
                const token = await jwt.sign({ username }, jwtSecret)
                res.status(200).json({ token })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    static async login(req, res) {
        try {
            const jwtSecret = process.env.JWT_SECRET
            let { error, info, baby } = await UserServices.login(req.body)
            if (error)
                res.status(400).json({ error })
            else if (info)
                res.status(401).json({ info })
            else {
                const { username } = baby
                const token = await jwt.sign({ username }, jwtSecret)
                res.status(200).json({ token })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    static async user(req, res) {
        try {
            const { error, user } = await UserServices.getSingleUser(req.params.email)

            if (error)
                res.status(204).json({ error })
            else {
                res.status(200).json({ username: user.username, email: user.email })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    static async getuser(req, res) {
        try {
            const { error, user } = await UserServices.getUser(req.user)

            if (error)
                res.status(401).json({ error })
            else {
                res.status(200).json({ username: user.username, email: user.email })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    static async updateuser(req, res) {
        try {
            const jwtSecret = process.env.JWT_SECRET
            const { error, user } = await UserServices.updateUser(req.user, req.body)

            if (error)
                res.status(400).json({ error })
            else {
                const token = await jwt.sign({ username: user.username }, jwtSecret)
                res.status(202).json({ user, token })
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    static async deleteuser(req, res) {
        try {
            const { error, info, deleted } = await UserServices.deleteUser(req.user, req.body)

            // console.log({ error, info, deleted })
            if (error) res.status(400).json({ error })
            else if (info) res.status(401).json({ info })
            else res.status(202).json({ deleted })
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    static async deleteUserByEmail(req, res) {
        try {
            const { error, info, deleted } = await UserServices.deleteUserByEmail(req)

            // console.log({ error, info, deleted })
            if (error) res.status(400).json({ error })
            else if (info) res.status(401).json({ info })
            else res.status(202).json({ deleted })
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
}