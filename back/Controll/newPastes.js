const MaxDate = require("../DB/MaxDateSchema");
const { addPaste, getLatestDate } = require("./mongoDB");
const { scraper } = require("./strongholdPaste");
    
const addNewPastesToDB = async (url, divSelector) =>{
    const aPastes = await extractNewestPastes(url, divSelector);
    // if(aPastes.length === 0){return aPastes};
    console.log("now im adding", aPastes.length, "items");
    for(const paste of aPastes){
        console.log("add-paste");
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
    console.log("update Date now");
    await MaxDate.updateOne({_id:"62029c9ffce25054ef02abd5"}, {date: newLatestDate} )
    console.log("their are ", newPastes.length, "new pastes");
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
