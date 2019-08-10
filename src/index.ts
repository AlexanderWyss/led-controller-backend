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
import {Characteristic, PrimaryService} from 'bleno';

const bleno = require('bleno');
const uuidGen = require('uuid/v5');
const uuid = 'de7daa74-9126-494c-b277-9ca4c0944c7e';


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

type Operation = (query: any) => Promise<any>;

interface Control {
    name: string;
    operation: Operation;
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

const characteristics = [];

function genUuid(name: string) {
    return uuidGen(name, uuid);
}

for (const control of controls) {
    router.get(control.name, (req: any, res: any, next: any) => {
        control.operation(req.query).then((returnValue) => res.send(returnValue));
    });

    console.log(control.name + " : " + genUuid(control.name));
    characteristics.push(new Characteristic({
        uuid: genUuid(control.name),
        properties: ['read', 'write'],
        onWriteRequest: (data, offset, withoutResponse, callback) => {
            control.operation(JSON.parse(data.toString())).then(empty => callback(Characteristic.RESULT_SUCCESS));
        },
        onReadRequest: (offset, callback) => {
            control.operation({}).then(value => callback(Characteristic.RESULT_SUCCESS, Buffer.from(JSON.stringify(value))));
        }
    }));
}

const primaryService = new PrimaryService({
    uuid: uuid,
    characteristics: characteristics
});


bleno.on('stateChange', (state: any) => {
    console.log('on -> stateChange: ' + state);

    if (state === 'poweredOn') {
        bleno.startAdvertising('LED', [primaryService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', (error: any) => {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([primaryService], (error: any) => {
            console.log('setServices: ' + (error ? 'error ' + error : 'success'));
        });
    }
});
module.exports = router;
