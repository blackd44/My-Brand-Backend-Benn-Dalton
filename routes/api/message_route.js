import { Router } from "express"
import Messages from "../../controllers/message.js"

const routes = Router()

routes.get('/', Messages.allMessages)
routes.post('/', Messages.sendMessage)
routes.get('/:id', Messages.oneMessage)
routes.patch('/:id', Messages.updateMessage)
routes.delete('/:id', Messages.deleteMessage)

export default routes