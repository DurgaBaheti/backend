import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";

const router = Router()

router.use(verifyJWT) // apply verifyJWT to all routes

router.route("/").post(createTweet)
router.route("/user-tweets").get(getUserTweets)
router.route("/update-tweet").post(updateTweet)
router.route("/delete-tweet").delete(deleteTweet)

// need to be correct routes

export default router