import app from "./app.js"

// starting the server
const PORT = process.env.SERVER_PORT || 4000

// while()
let first = true
while (app == undefined || first) {
    if (app !== undefined) {
        app.listen(PORT, () => {
            console.log(`listening to port`, PORT)
        })
    }
    first = false
}