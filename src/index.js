// require('dotenv').config({path: "./env"})
import dotenv from "dotenv";
import { port, app } from "./app.js";


import connectDB from "./db/index.js";

dotenv.config({ path: "./env" })

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Express Errr: ", error);
            throw error;
        }),
        app.listen(port, () => {
            console.log(`server started at port: ${port}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection Failed!!!", err);
    });


















/*import mongoose from "mongoose";
import { DB_Name } from "./constants.js";

import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        app.on("error", (error) => {
            console.log("ERROR:", error);
            throw error;
        })

        app.listen(PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
})()
*/
