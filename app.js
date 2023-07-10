const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const morgan = require('morgan')
const colors = require("colors")
require("./db/connection")
// port 
const port = process.env.PORT || 6000;
// routing
const router = require("./routes/route");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'))
// for upload images and access to store these photo in public folder
app.use(express.static('public'))

app.use(router)

app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`connected to local host  at port ${port}`.bgBlue.white);
});
 