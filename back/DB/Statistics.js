const mongoose = require("mongoose");

const SentimentStatistics = new mongoose.Schema({
    positive : {
        type : String,
        required : true
    },
    nagitive: {
        type: String,
        required: true
    },
    natural: {
        type: String,
        required: true,
    },
    unknown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique : true
    }
})

const Sentiment = mongoose.model("stronghold_paste", SentimentStatistics);


module.exports = Sentiment;