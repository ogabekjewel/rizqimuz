const Express = require("express")
const Path = require("path")
const Fs = require("fs")
const CookieParser = require("cookie-parser")
const { PORT } = require("../config")
const Morgan = require("morgan")
const FileUpload = require("express-fileupload")
const mongo = require("./modules/mongo")

const app = Express()
mongo()

app.use(CookieParser())
app.use(Morgan("tiny"))
app.use(FileUpload())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use("/", Express.static(Path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", Path.join(__dirname, "views"))

Fs.readdir(Path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach(file => {
            const routePath = Path.join(__dirname, "routes", file)
            const Route = require(routePath)
            
            if(Route.path && Route.router) app.use(Route.path, Route.router)
        })
    }
})

app.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))
