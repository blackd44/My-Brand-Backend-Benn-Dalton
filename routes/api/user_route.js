import { Router } from "express";
import Users from "../../controllers/user.js";
import authUserToken from "../../middlewares/authusertoken.js";

const router = Router()

router.post('/signup', Users.signup)
router.post('/login', Users.login)
router.get('/user', authUserToken, Users.getuser)
router.delete('/user', authUserToken, Users.deleteuser)

export default router