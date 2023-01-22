import { Router } from "express";
import Users from "../../controllers/user.js";
import authUserToken from "../../middlewares/authusertoken.js";

const router = Router()

router.post('/signup', Users.signup)
router.post('/login', Users.login)
router.get('/user', authUserToken, Users.getuser)
router.get('/:email', Users.user)
router.patch('/user', authUserToken, Users.updateuser)
router.delete('/user', authUserToken, Users.deleteuser)
router.delete('/:email', authUserToken, Users.deleteUserByEmail)

export default router