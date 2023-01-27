import { Router } from "express"
import Blogs from "../../controllers/blog.js"
import authUserToken from "../../middlewares/authusertoken.js";

const routes = Router()

routes.get('/', Blogs.getAll)
routes.post('/', authUserToken, Blogs.postBlog)
routes.get('/:id', Blogs.getSingle)
routes.patch('/:id', authUserToken, Blogs.updateBlog)
routes.delete('/:id', authUserToken, Blogs.deleteSingle)

export default routes