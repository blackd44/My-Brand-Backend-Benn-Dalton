import { Router } from "express"
import messages from "./api/message_route.js"
import users from "./api/user_route.js"

const routes = Router()

routes.get('/', (req, res) => res.json({ data: "api" }))
routes.use('/messages', messages)
routes.use('/users', users)

export default routes