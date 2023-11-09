// require('dotenv').config({path: "./env"})
import dotenv from "dotenv";


import connectDB from "./db/index.js";

dotenv.config({path: "./dotenv"})

connectDB();

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
