import express from "express";
const port = process.env.PORT || 8000;
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded( {extended: true, limit:"16kb"} ))
app.use(express.static("public"))
app.use(cookieParser())


export { port, app };

