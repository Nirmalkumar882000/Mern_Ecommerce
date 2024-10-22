const moongoose = require("mongoose")

const reviewSchema = new moongoose.Schema({
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
},
    {
        timestamps: true
    }
)

const Review = moongoose.model("Review", reviewSchema)

module.exports = Review