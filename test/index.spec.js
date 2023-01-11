import { } from 'dotenv/config'
import testMessages from "./api/messages.spec.js";

const PORT = process.env.SERVER_PORT

const server = 'http://localhost:' + PORT

testMessages(server)