import app from "./app.js"

// starting the server
const PORT = process.env.SERVER_PORT || 4000

await app.listen(PORT, () => {
    console.log(`listening to port`, PORT)
})

export default app