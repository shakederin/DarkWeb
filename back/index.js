const axios = require("axios");
const { parse } = require("node-html-parser");
const { addPaste, getPastes } = require("./Controll/mongoDB");

 //*********************get and orginize the data */
const scraper = async (url, divSelector) => {
    const htmlPasred = parse( await getWebsiteHTML(url));
    const elements = htmlPasred.querySelectorAll(divSelector)
    const aPastes = dataExtractor(elements)
    return aPastes
};

const getWebsiteHTML = async (url) =>{
    const response = await axios.get(url,
        { proxy: { port: 8118, host: "localhost" } }
    );
    return response.data
}

const dataExtractor = (elements) =>{
    const data = [] 
    for (const element of elements) {
        const authorDateElement = element.querySelector(".col-sm-6");
        const titleElement = element.querySelector("h4");
        const contentElement = element.querySelector(".text");
        if(authorDateElement && titleElement && contentElement){
            const _title = titleElement.innerText
            const title = _title.replace(/\n|\t|&nbsp;/g, " ").trim();
            const _content = contentElement.innerText
            const content = _content.replace(/\n|\t|&nbsp;/g, " ").trim()
            if(title.length < 4 || content.length < 4) continue;
            const aAndD = authorDateElement.innerText.split(" ")
            const author = aAndD[2]
            const date = new Date(`${aAndD[4]}  ${aAndD[5]}  ${aAndD[6]}  ${aAndD[7]}`)
            data.push({author: handleAuther(author), title, content, date})
        }
    }
    return data
}

const handleAuther = (author) =>{
    const sameOutput = ["Guest" , "Unknown" , "Anonymous", ""]
    if(sameOutput.includes(author)){
        return "Unknown"
    }
    return author
}
 //********************************************* */
 
//******handle new pastes*********************** */
const extractNewestPastes = async (url, divSelector) =>{
    const aPastes = await scraper(url, divSelector);
    const latestDate = await getLatestPasteDateFromDB();
    const newPastes = [];
    for(const paste of aPastes){
        if(paste.date > latestDate){
            newPastes.push(paste)
        }
    }
    return newPastes
} 
    
const addNewPastesToDB = async (url, divSelector) =>{
    const aPastes = await extractNewestPastes(url, divSelector);
    if(!aPastes.length) return;
    for(const paste of aPastes){
        await addPaste(paste);
    }
} 

const getLatestPasteDateFromDB = async () =>{
    const aPastes = await getPastes();
    let latestPaste =  new Date("0000-02-08T04:08:44.000Z")
    for(const paste of aPastes){
        if(paste.date > latestPaste){
            latestPaste = paste.date;
        }
    }
    return latestPaste;
}

//********************************************* */    
    
    
    addNewPastesToDB(
        "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
        "#list > .row",
        );


        const debounce = (fn, delay) =>{
            let timeoutID;
            return function(...args) {
                if (timeoutID){
                    clearTimeout(timeoutID)
                }
                timeoutID = setTimeout(()=>{
                    fn(...args);
                }, delay)
            }
        }