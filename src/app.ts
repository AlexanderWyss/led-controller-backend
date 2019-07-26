import express = require("express");
import path = require("path");

const cors = require("cors");
const indexRouter = require("./index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "/public/")));
module.exports = app;
