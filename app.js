import { } from 'dotenv/config'
import express from "express"
import routes from "./routes/index.js"
import cors from "cors"
import mongoose from 'mongoose'
import morgan from 'morgan'
import url from "url"
import { join } from 'path'
import swaggerUI from 'swagger-ui-express'
import swagger from './swagger.js'

const app = express()
const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url))

app.set("view engine", "ejs")
app.set("views", join(__dirname, "views"))
app.use(express.static(join(__dirname, "public")))

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

// routes
app.use('/api', routes)
app.use((req, res) => {
    res.status(404).json({ message: "Page not Found" })
})


// starting the database
export default await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected ...')
    return app
}).catch(e => console.error(e))