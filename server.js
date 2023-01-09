import { } from 'dotenv/config'
import express from "express"
import routes from "./routes/index"
import cors from "cors"

const app = express()

// middlewares
app.use(cors())

// routes
app.use('/api', routes)
app.use((req, res) => {
    res.status(404).json({ message: "Page not Found" })
})

// starting the server
const Port = process.env.SERVER_PORT || 4000
app.listen(Port, () => {
    console.log("Listening at port", Port)
})