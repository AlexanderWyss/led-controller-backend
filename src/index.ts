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

interface Operation {
    (query: any): Promise<any>;
}

interface Control {
    name: string,
    operation: Operation
}

const controls: Control[] = [
    {
        name: "/api/options",
        operation: async (query) => {
            const pattern = query.pattern;
            const controller = getPatternController(pattern);
            controller.setFromQuery(query);
        }
    }, {
        name: "/api/options/pin/set",
        operation: async (query) => {
            generalController.setPin(query.pin);
        }
    }, {
        name: "/api/options/leds/set",
        operation: async (query) => {
            generalController.setNumberOfLeds(query.leds);
        }
    }, {
        name: "/api/start",
        operation: async (query) => {
            const pattern = query.pattern;
            const controller = getPatternController(pattern);
            controller.start();
        }
    }, {
        name: "/api/stop",
        operation: async (query) => {
            generalController.stop();
        }
    }, {
        name: "/api/alloff",
        operation: async (query) => {
            generalController.allOff();
        }
    }, {
        name: "/api/serialport/get",
        operation: async (query) => {
            const ports = await arduinoPort.getSerialPorts();
            return {serialports: ports};
        }
    }, {
        name: "/api/serialport/set",
        operation: async (query) => {
            arduinoPort.setPort(query.name);
        }
    }
];

for (const route of controls) {
    router.get(route.name, (req: any, res: any, next: any) => {
        route.operation(req.query).then((returnValue) => res.send(returnValue));

    });
}
module.exports = router;
