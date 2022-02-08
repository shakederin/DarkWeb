const mongoose = require("mongoose");

const StrongholdPasteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique : true
    },
    content: {
        type: String,
        required: true
    }
})

const Paste = mongoose.model("stronghold_paste", StrongholdPasteSchema);

module.exports = Paste;