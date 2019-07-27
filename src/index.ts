import {ArduinoPort} from "./ArduinoPort";
import {GeneralController} from "./GeneralController";
import {LEDController} from "./LEDController";
import {RainbowController} from "./RainbowController";
import {WaveController} from "./WaveController";

const express = require("express");
const router = express.Router();

const arduinoPort = ArduinoPort.get();

function getController(pattern: string) {
    let controller: LEDController;
    switch (pattern) {
        case "wave":
            controller = new WaveController(arduinoPort);
            break;
        case "rainbow":
            controller = new RainbowController(arduinoPort);
            break;
        case "rider":
            break;
        case "strobe":
            break;
        case "running":
            break;
        case "chase":
            break;
        case "sparkle":
            break;
    }
    return controller;
}

router.get("/api/options", (req: any, res: any, next: any) => {
    const pattern = req.query.pattern;
    const controller = getController(pattern);
    controller.setFromQuery(req);
    res.sendStatus(200);
});
router.get("/api/start", (req: any, res: any, next: any) => {
    const pattern = req.query.pattern;
    const controller = getController(pattern);
    controller.start();
    res.sendStatus(200);
});
router.get("/api/stop", (req: any, res: any, next: any) => {
    const controller = new GeneralController(arduinoPort);
    controller.stop();
    res.sendStatus(200);
});
router.get("/api/alloff", (req: any, res: any, next: any) => {
    const controller = new GeneralController(arduinoPort);
    controller.allOff();
    res.sendStatus(200);
});
module.exports = router;
