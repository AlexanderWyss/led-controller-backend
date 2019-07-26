import {ArduinoPort} from "./ArduinoPort";
const path = require("path");

const express = require("express");
const router = express.Router();

const port = new ArduinoPort();

router.get("/", (req: any, res: any, next: any) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.get("/wave", (req: any, res: any, next: any) => {
    port.write("!WaveRun");
    res.sendStatus(200);
});
router.get("/rainbow", (req: any, res: any, next: any) => {
    port.write("!RainbowRun");
    res.sendStatus(200);
});
router.get("/rider", (req: any, res: any, next: any) => {
    port.write("!RiderRun");
    res.sendStatus(200);
});
router.get("/strobe", (req: any, res: any, next: any) => {
    port.write("!StrobeRun");
    res.sendStatus(200);
});
router.get("/running", (req: any, res: any, next: any) => {
    port.write("!RunningRun");
    res.sendStatus(200);
});
router.get("/chase", (req: any, res: any, next: any) => {
    port.write("!ChaseRun");
    res.sendStatus(200);
});
router.get("/sparkle", (req: any, res: any, next: any) => {
    port.write("!SparkleRun");
    res.sendStatus(200);
});

module.exports = router;
