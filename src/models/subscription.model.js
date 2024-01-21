import mongoose, { Schema } from "mongoose";

const subsriptionSchema = new Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        Channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

export const Subscription = mongoose.model("Subscription", subsriptionSchema);