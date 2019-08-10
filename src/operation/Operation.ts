import {ArduinoPort} from "../ArduinoPort";
import {GeneralController} from "../controller/GeneralController";
import {PatternController} from "../controller/PatternController";
import {PatternService} from '../controller/PatternService';

export enum OperationType {
    WRITE, READ
}

export abstract class Operation {

    private static ARDUINO_PORT = ArduinoPort.get();
    private static PATTERN_CONTROLLERS = PatternService.getPatternControllers(Operation.ARDUINO_PORT);
    private static GENERAL_CONTROLLER = new GeneralController(Operation.ARDUINO_PORT);

    protected constructor(name: string, public readonly type: OperationType) {
        this.name = "/api/" + name;
    }

    public readonly name: string;

    public abstract async execute(data?: any): Promise<any>;

    protected getPatternController(pattern: string): PatternController {
        return Operation.PATTERN_CONTROLLERS.filter((controller) => controller.name.toLowerCase() == pattern.toLowerCase())[0];
    }

    protected generalController(): GeneralController {
        return Operation.GENERAL_CONTROLLER;
    }

    protected arduinoPort(): ArduinoPort {
        return Operation.ARDUINO_PORT;
    }
}
