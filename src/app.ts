import express = require("express");
import path = require("path");
import SocketIO from "socket.io";
import Websocket from "./Websocket";

const cors = require("cors");
const indexRouter = require("./index");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "/public/")));
app.use((req: any, res: any) => { res.sendFile(path.join(__dirname + "/public/index.html")); });

const httpServer = http.createServer(app);
httpServer.listen(3001);
const socket = SocketIO(httpServer);
const websocket = new Websocket(socket);

module.exports = app;
