import { } from 'dotenv/config'
import express from "express"
import routes from "./routes/index.js"
import cors from "cors"
import mongoose from 'mongoose'
import morgan from 'morgan'
import url from "url"
import { join } from 'path'

const app = express()
const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url))

app.set("view engine", "ejs")
app.set("views", join(__dirname, "views"))
app.use(express.static(join(__dirname, "public")))

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