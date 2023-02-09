import { Router } from "express";
import Likes from "../../controllers/likes.js";
import authUserToken from "../../middlewares/authusertoken.js";

const routes = Router()

routes.post('/blogs/:blogId', authUserToken, Likes.blogs)
routes.post('/comments/:commentId', authUserToken, Likes.comments)

export default routes