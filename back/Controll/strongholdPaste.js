const axios = require("axios");
const { parse } = require("node-html-parser");

exports.scraper = async (url, divSelector) => {
    const htmlPasred = parse( await getWebsiteHTML(url));
    const elements = htmlPasred.querySelectorAll(divSelector)
    const aPastes = dataExtractor(elements)
    return aPastes
};

const getWebsiteHTML = async (url) =>{
    try {
        const response = await axios.get(url,
            { proxy: { port: 8118, host: "localhost" } }
        );
        return response.data
        
    } catch (error) {
        console.log(error ,"fetch data failed");
        return []
    }
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