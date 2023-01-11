import { } from 'dotenv/config'
import express from "express"
import routes from "./routes/index"
import cors from "cors"
import mongoose from 'mongoose'

const app = express()

// middlewares
app.use(cors())

// routes
app.use('/api', routes)
app.use((req, res) => {
    res.status(404).json({ message: "Page not Found" })
})

// starting the server
const PORT = process.env.SERVER_PORT || 4000

const BDURL = process.env.DB_URL

mongoose.connect(BDURL, () => {
    console.log("DataBase Connected successfully");
    app.listen(PORT, () => {
        console.log("Listening at port", PORT)
    })
}, e => console.log(e))