import { Router } from "express";
import Comments from "../../controllers/comment.js";
import authUserToken from "../../middlewares/authusertoken.js";

const routes = Router()

routes.get('/:blogId/comments/', Comments.getAll)
routes.post('/:blogId/comments/', authUserToken, Comments.postComment)

routes.post('/:commentId/reply/', authUserToken, Comments.postReply)

export default routes