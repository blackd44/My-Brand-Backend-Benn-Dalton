import { } from 'dotenv/config'
import express from "express"
import routes from "./routes/index"
import cors from "cors"
import mongoose from 'mongoose'
import morgan from 'morgan'

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
app.use('/api', routes)
app.use((req, res) => {
    res.status(404).json({ message: "Page not Found" })
})

// starting the server
const PORT = process.env.SERVER_PORT || 4000

const BDURL = process.env.DB_URL

mongoose.connect(BDURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log('\nDatabase connected ...')
        app.listen(PORT, () => {
            console.log(`listening to port`, PORT)
        })
    },
    e => console.error(e)
)