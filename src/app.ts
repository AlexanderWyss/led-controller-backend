import cors = require("cors");

import express = require("express");
import path = require("path");

const indexRouter = require("./index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "/public/")));
app.use((req: any, res: any) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

module.exports = app;
