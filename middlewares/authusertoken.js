import jwt from "jsonwebtoken";

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
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) res.status(403)
        req.user = user
        next()
    })

}