import app from "./app.js"

// starting the server
const PORT = process.env.SERVER_PORT || 4000

// while()
let first = true
while (first) {
    if (app !== undefined) {
        first = false
        app.listen(PORT, () => {
            console.log(`listening to port`, PORT)
        })
    }
}