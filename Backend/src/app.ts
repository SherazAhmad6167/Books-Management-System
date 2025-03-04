import express from "express"
import cors from "cors"
import router from "./routes/book.routes"
import path from "path"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:55972',
    credentials: true
}))

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use('/public',express.static("public"))
app.use('/api/books', router)

export default app