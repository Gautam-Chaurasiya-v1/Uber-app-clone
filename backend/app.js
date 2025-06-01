const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connectToDB = require('./db/db.js')
const rootRouter = require("./routes/index.js")


connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1', rootRouter);

app.get('/', (req, res) => {
    res.send("Hello , Hi there !!!")
});


module.exports = app;