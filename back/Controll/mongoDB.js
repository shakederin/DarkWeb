const Paste = require("../DB/Schema");
const  Mongoose  = require("mongoose");
require('dotenv').config();

const connectionString = process.env.CONNECTIONSTRING;
console.log(connectionString);

Mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{'error connecting to MongoDB:', error.message});


exports.addPaste = async (extractedData, i)=>{
    const {title, author, date, content} = extractedData;

    if(await isPasteExists(date, content) === "error"){ 
        console.log("error with DB", i)
        return;
    }

    if(await isPasteExists(date, content) ){ 
        console.log("Paste already exists", i)
        return;
    }

    const newPaste = {
        title,
        author,
        date,
        content
    }

    try {
        await Paste.insertMany(newPaste);
        console.log("Paste add successfully")
    } catch (error) {
        console.log("couldn't add new user", i)
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
        // console.log(error);
        return "error"
    }

}

exports.getPastes = async () =>{
    const allPastes = await Paste.find({})
    return allPastes;
} 