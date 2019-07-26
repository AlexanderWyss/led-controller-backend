import {LEDController} from "./LEDController";
import {RainbowController} from "./RainbowController";
import {WaveController} from "./WaveController";

const express = require("express");
const router = express.Router();

function getController(pattern: string) {
    let controller: LEDController;
    switch (pattern) {
        case "wave":
            controller = new WaveController();
            break;
        case "rainbow":
            controller = new RainbowController();
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
module.exports = router;
