const mongoose = require("mongoose");

const SentimentStatistics = new mongoose.Schema({
    positive : {
        type : Number,
        required : true
    },
    negative: {
        type: Number,
        required: true
    },
    neutral: {
        type: Number,
        required: true,
    },
    unknown: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique : true
    }
})

const Sentiment = mongoose.model("Sentiment", SentimentStatistics);


module.exports = Sentiment;