import { Router } from "express"
import Messages from "../../controllers/message"

const routes = Router()

routes.get('/', Messages.allMessages)
routes.post('/', Messages.sendMessage)
routes.get('/:id', Messages.oneMessage)

export default routes