import mongoose, { Schema } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    if (content.trim === "") {
        throw new ApiError(404, "Tweet cannot be EMPTY!!");
    }
    if (content > 700) {
        throw new ApiError(400, "message length should not exceed 700") // 400 status code unprocesseble
    }
    const tweetUser = await User.findById(req.user._id).select( // req.user._id isliye use kar paaya kyunki verify JWT lagaya hua hai.
        "-refreshToken -password"
    )
    if (!tweetUser) {
        throw new ApiError(404, "something went wrong while fetching user details!!")
    }
    const tweet = await Tweet.create({
        content,
        owner: tweetUser
    })
    if (!tweet) {
        throw new ApiError(500, "something went wrong while uploading tweet")
    }
    return res.status(200).json(
        new ApiResponse(200, tweet, "Tweet Addedd Successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    const tweets = await Tweet.find({
        owner: req.user._id
    }).select("-owner")
    return res
        .status(200)
        .json(
            new ApiResponse(200, tweets, "Tweets fetched Sucessfully")
        )

})

const updateTweet = asyncHandler(async (req, res) => {
    const { _id, newTweet } = req.body;
    if (!_id || !newTweet) {
        throw new ApiError(400, "Cannot be Empty!!")
    }
    const updatedTweet = await Tweet.findByIdAndUpdate(
        _id,
        {
            $set: {
                content: newTweet,
                // updatedAt: JSON.stringify(new Date()) // converts current date in TZ format
                // but no need it automatically updates
            }
        },
        {new : true}
    ).select("-owner")
    if(!updatedTweet) {
        throw new ApiError(404, "Tweet Not Found!!")
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTweet, "Tweet Updated Successfully")
        )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { _id } = req.body
    const deleted = await Tweet.findByIdAndDelete(_id).select("-owner")
    if(!deleted) {
        throw new ApiError(404, "Tweet Not FOund!!")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, deleted, "Tweet Deleted Successfully"
            )
        )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}