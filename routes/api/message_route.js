import { Router } from "express"
import Messages from "../../controllers/message"

const routes = Router()

routes.get('/', Messages.allMessages)

export default routes