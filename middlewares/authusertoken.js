import jwt from "jsonwebtoken";
import { User } from "../models/user_model.js";

export default async function authUserToken(req, res, next) {
    const auth = req.headers['authorization']
    const bearer = auth !== undefined
        ? auth.split(' ')
        : undefined
    const token = bearer ? bearer[1] : undefined
    if (token == undefined || token == null || token == '') {
        res.status(401).json({ info: { message: "not authorized" } })
        return
    }

    const jwtSecret = process.env.JWT_SECRET
    let out = await jwt.verify(token, jwtSecret, async (err, user) => {
        if (err != null) return 403
        else if (user.username == undefined) return 403
        else {
            let old = await User.findOne({ username: user.username }).select('-_id username email')
            if (old == null) return 403
            else {
                req.user = old
                next()
            }
        }
    })
    if (out == 403)
        res.status(403).json({ info: { message: "not authorized" } })
}