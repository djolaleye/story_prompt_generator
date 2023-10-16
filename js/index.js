const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const rootDir = path.join(__dirname, '..');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', rootDir + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {
    const data = {

    };

    res.render("index.html", data);
})




app.listen(port, () => {
    console.log(`Listening  on port ${port}`);
})


