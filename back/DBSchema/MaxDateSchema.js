const mongoose = require("mongoose");

const MaxDateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique : true
    }
})

const MaxDate = mongoose.model("date", MaxDateSchema);

module.exports = MaxDate;