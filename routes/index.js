import { Router } from "express"
import messages from "./api/message_route.js"
import blogs from "./api/blog_route.js"

const routes = Router()

routes.get('/', (req, res) => res.json({ data: "api" }))
routes.use('/messages', messages)
routes.use('/blogs', blogs)

export default routes