const mongoose = require("mongoose");

const PastePerHours = new mongoose.Schema({
    "00:00" : {
        type : Number,
        required : true
    },
    "01:00": {
        type: Number,
        required: true
    },
    "02:00": {
        type: Number,
        required: true,
    },
    "03:00": {
        type: Number,
        required: true
    },
    "04:00": {
        type: Number,
        required: true
    },
    "05:00": {
        type: Number,
        required: true
    },
    "06:00": {
        type: Number,
        required: true
    },
    "07:00": {
        type: Number,
        required: true
    },
    "08:00": {
        type: Number,
        required: true
    },
    "09:00": {
        type: Number,
        required: true
    },
    "10:00": {
        type: Number,
        required: true
    },
    "11:00": {
        type: Number,
        required: true
    },
    "12:00": {
        type: Number,
        required: true
    },
    "13:00": {
        type: Number,
        required: true
    },
    "14:00": {
        type: Number,
        required: true
    },
    "15:00": {
        type: Number,
        required: true
    },
    "16:00": {
        type: Number,
        required: true
    },
    "17:00": {
        type: Number,
        required: true
    },
    "18:00": {
        type: Number,
        required: true
    },
    "19:00": {
        type: Number,
        required: true
    },
    "20:00": {
        type: Number,
        required: true
    },
    "21:00": {
        type: Number,
        required: true
    },
    "22:00": {
        type: Number,
        required: true
    },
    "23:00": {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique : true
    }
})

const Hours = mongoose.model("PastsPerHour", PastePerHours);


module.exports = Hours;