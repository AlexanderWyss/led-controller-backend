import {ArduinoPort} from "./ArduinoPort";
import {ChaseController} from "./ChaseController";
import {GeneralController} from "./GeneralController";
import {PatternController} from "./PatternController";
import {RainbowController} from "./RainbowController";
import {RiderController} from "./RiderController";
import {RunningController} from "./RunningController";
import {SparkleController} from "./SparkleController";
import {StrobeController} from "./StrobeController";
import {WaveController} from "./WaveController";

const express = require("express");
const router = express.Router();

const arduinoPort = ArduinoPort.get();

const patternController = [
    new WaveController(arduinoPort), new RainbowController(arduinoPort), new RiderController(arduinoPort),
    new StrobeController(arduinoPort), new RunningController(arduinoPort), new ChaseController(arduinoPort),
    new SparkleController(arduinoPort)
];

const generalController = new GeneralController(arduinoPort);

function getPatternController(pattern: string): PatternController {
    return patternController.filter((controller) => controller.name.toLowerCase() == pattern.toLowerCase())[0];
}

router.get("/api/options", (req: any, res: any, next: any) => {
    const pattern = req.query.pattern;
    const controller = getPatternController(pattern);
    controller.setFromQuery(req);
    res.sendStatus(200);
});
router.get("/api/start", (req: any, res: any, next: any) => {
    const pattern = req.query.pattern;
    const controller = getPatternController(pattern);
    controller.start();
    res.sendStatus(200);
});
router.get("/api/stop", (req: any, res: any, next: any) => {
    generalController.stop();
    res.sendStatus(200);
});
router.get("/api/alloff", (req: any, res: any, next: any) => {
    generalController.allOff();
    res.sendStatus(200);
});
module.exports = router;
