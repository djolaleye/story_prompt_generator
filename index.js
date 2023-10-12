import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let data = {};
    res.render("views/index.ejs", data);
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})