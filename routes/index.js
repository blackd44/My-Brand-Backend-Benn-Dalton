import { Router } from "express"
import messages from "./api/message_route.js"
import users from "./api/user_route.js"
import blogs from './api/blog_route.js'
import likes from './api/likes_route.js'
import comments from './api/comment_route.js'

const routes = Router()

routes.get('/', (req, res) => res.json({ data: "api" }))
routes.use('/messages', messages)
routes.use('/users', users)
routes.use('/blogs', comments)
routes.use('/blogs', blogs)
routes.use('/likes', likes)

export default routes