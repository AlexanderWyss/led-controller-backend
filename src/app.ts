import express = require("express");
const indexRouter = require("./index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
module.exports = app;
