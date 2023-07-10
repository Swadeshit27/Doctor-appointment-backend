const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    reviewData: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Review", ReviewSchema)