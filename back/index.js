const express = require("express");
const cors = require("cors")
const { addNewPastesToDB, extractNewestPastes } = require("./Controll/newPastes");
const { getPastes, getFilteredPastes, getAllSentiments, getAllPastesByHours, get10Pastes } = require("./Controll/mongoDB");
const app = express();
const port = process.env.PORT || 8081
const url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all";
const className = "#list > .row";

app.use(cors());
app.use(express.json());
const usersRes = []

app.get("/paste/all", async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });
    const sendData = async () => {
        await addNewPastesToDB(url, className);
        const pastes = await get10Pastes(0);
        console.log("sending:", pastes.length , "items");
        res.write(`data: ${JSON.stringify(pastes)}\n\n`);
    }
    const sendUpdate = async () => {
        const newPastes = await addNewPastesToDB(url, className);
        if (usersRes.length !== 0) {
            console.log("sending update of:", newPastes.length , "items");
            res.write(`data: ${JSON.stringify(newPastes)}\n\n`);
        }
    }
    await sendData();
    setInterval(async () => {
        console.log("im in loop");
        await sendUpdate()
    }, (1000 * 60 ))
})

app.get("/filter", async (req, res)=>{
    const input = req.query.input
    const FilteredPastes = await getFilteredPastes(input)
    res.send(FilteredPastes)
})
app.get("/pastes/ten", async (req, res)=>{
    const page = req.query.page
    const tenPastes = await get10Pastes(page)
    res.send(tenPastes)
})

app.get("/sentiment", async (req, res)=>{
    const allSentiments = await getAllSentiments()
    res.send(allSentiments)
})

app.get("/PasteByHour", async (req, res)=>{
    const allPastesByHours = await getAllPastesByHours()
    res.send(allPastesByHours)
})

app.listen(port, () => {
    console.log("listening to", port);
})




// query.skip(100).limit(20)
// https://www.w3resource.com/mongodb/mongodb-skip-limit.php