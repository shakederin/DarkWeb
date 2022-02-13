const MaxDate = require("../DBSchema/MaxDateSchema");
const { addPaste, getLatestDate } = require("./mongoDB");
const { scraper } = require("./strongholdPaste");
    
const addNewPastesToDB = async (url, divSelector) =>{
    const aPastes = await extractNewestPastes(url, divSelector);
    for(const paste of aPastes){
        await addPaste(paste);
    }
    return aPastes;
} 

const extractNewestPastes = async (url, divSelector) =>{
    const aPastes = await scraper(url, divSelector);
    const latestDate = await getLatestPasteDateFromDB();
    const newPastes = [];
    let newLatestDate = latestDate
    for(const paste of aPastes){
        if(paste.date > latestDate){
            newPastes.push(paste);
            if(paste.date>newLatestDate){
                newLatestDate = paste.date;
            }
        }
    }
    await MaxDate.updateOne({_id:"62029c9ffce25054ef02abd5"}, {date: newLatestDate} )
    return newPastes
} 

const getLatestPasteDateFromDB = async () =>{
    const latestPasteDate = await getLatestDate();
    return latestPasteDate[0].date;
}

module.exports = {
    addNewPastesToDB,
    extractNewestPastes
}
