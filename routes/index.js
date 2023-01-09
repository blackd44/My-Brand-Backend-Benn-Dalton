import { Router } from "express"
const routes = Router()

routes.get('/', (req, res) => {
    res.json({ data: "api" })
})

export default routes