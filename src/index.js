import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "../config/config.env"
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is runnning at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!!", err);
  });
