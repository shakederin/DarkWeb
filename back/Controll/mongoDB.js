const Paste = require("../DBSchema/PasteSchema");
const  Mongoose  = require("mongoose");
const MaxDate = require("../DBSchema/MaxDateSchema");
const axios = require("axios");
const Sentiment = require("../DBSchema/StatisticsSchema");
const Hours = require("../DBSchema/PostsHoursSchema");
require('dotenv').config();

const connectionString = process.env.CONNECTIONSTRING;

Mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{ console.log('error connecting to MongoDB:', error.message)});


exports.addPaste = async (extractedData)=>{
    const {title, author, date, content} = extractedData;
    const sentiment = await findSantiment(content)
    const hour = date.toString().substring(16, 18);
    if(await isPasteExists(date, content) === "error"){ 
        console.log("error with DB")
        return;
    }
    if(await isPasteExists(date, content) ){ 
        console.log("Paste already exists")
        return;
    }

    const newPaste = {
        title,
        author,
        date,
        content,
        sentiment
    }

    try {
        await Paste.insertMany(newPaste);
        await updateSentiment(sentiment);
        await updatePastePerHour(hour);
        console.log("Paste add successfully")
    } catch (error) {
        console.log("here");
        console.log(error.message)
    }
}

const isPasteExists = async (date, content) =>{
    try {
        const bool = await Paste.exists({date, content});
        if (bool){
            return true;
        } 
        return false
    } catch (error) {
        console.log(error, "error");
        return "error"
    }

}

exports.getLatestDate = async () =>{
    const latestDate = await MaxDate.find({})
    return latestDate;
} 

exports.getPastes = async () =>{
    const allPastes = await Paste.find({})
    return allPastes;
} 

const findSantiment = async (text) =>{
    try {
        const response = await axios.post("https://sentim-api.herokuapp.com/api/v1/", { 
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            text
        }); 
            return(response.data.result.type); 
    } catch (error) {
        console.log(error.message);
    }
}

const updateSentiment = async (sentiment) =>{
    const key = sentiment;
    const obj = {};
    obj[key] = 1 ;
    try {
        await Sentiment.updateOne({_id : "620693306b5d6b64c9d12a70"}, {$inc :obj, date : new Date()})
    } catch (error) {
        console.log(error.message);
    }
}

const updatePastePerHour = async (hour) =>{
    const key = hour + ":00";
    const obj = {};
    obj[key] = 1 ;

    try {
        await Hours.updateOne({_id : "6206abdaf27e2ac3341bb98b"}, {$inc :obj, date : new Date()})
    } catch (error) {
        console.log(error.message);
    }
}

exports.get10Pastes = async (page) =>{
    const tenPastes = await Paste.find().find().skip(page * 10).limit(10);
    return tenPastes
}

exports.getFilteredPastes = async (input, ) =>{
    let regex = new RegExp(input,'i');
    console.log(regex, "regex");
    const tenPastes = await Paste.find({
        $or: [
            {title: { $regex: regex}},
            {content: { $regex: regex}}
        ]}).find();
    return tenPastes
}

exports.getAllSentiments = async () =>{
    try {
       const allSentiments = await Sentiment.find({});
       return allSentiments;
    } catch (error) {
        console.log(error.message, "getAllSentiments");
    }
}

exports.getAllPastesByHours = async () =>{
    try {
       const allPastesByHours = await Hours.find({});
       return allPastesByHours;
    } catch (error) {
        console.log(error.message, "getAllPastesByHours");
    }
}

// .find().skip(page * 10).limit(10);