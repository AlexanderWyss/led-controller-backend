import express = require('express');
const cors = require('cors');
const indexRouter = require("./index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", indexRouter);
module.exports = app;
