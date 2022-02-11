const express = require("express");
const cors = require("cors")
const { addNewPastesToDB, extractNewestPastes } = require("./Controll/newPastes");
const { scraper } = require("./Controll/strongholdPaste");
const { getPastes } = require("./Controll/mongoDB");
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
        const pastes = await getPastes();
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
    }, 1000 * 10 )
})

app.listen(port, () => {
    console.log("listening to", port);
})



const debounce = (fn, delay) => {
    let timeoutID;
    return function (...args) {
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}
