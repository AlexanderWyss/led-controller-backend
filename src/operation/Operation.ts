import {ArduinoPort} from '../ArduinoPort';
import {GeneralController} from '../controller/GeneralController';
import {PatternController} from '../controller/PatternController';
import {StartOperation} from './StartOperation';
import {StopOperation} from './StopOperation';
import {AllOffOperation} from './AllOffOperation';
import {LedsSetOperation} from './LedsSetOperation';
import {OptionsOperation} from './OptionsOperation';
import {PinSetOperation} from './PinSetOperation';
import {SerialportGetOperation} from './SerialportGetOperation';
import {SerialportSetOperation} from './SerialportSetOperation';

export enum OperationType {
    WRITE, READ
}

export abstract class Operation {
    private static ARDUINO_PORT = ArduinoPort.get();
    private static GENERAL_CONTROLLER = new GeneralController(Operation.ARDUINO_PORT);
    private static PATTERN_CONTROLLERS = PatternController.getPatternControllers(Operation.ARDUINO_PORT);
    public readonly name: string;

    protected constructor(name: string, public readonly type: OperationType) {
        this.name = '/api/' + name;
    }

    public static getOperations(): Operation[] {
        return [
            new AllOffOperation(), new LedsSetOperation(), new OptionsOperation(), new PinSetOperation(),
            new SerialportGetOperation(), new SerialportSetOperation(), new StartOperation(), new StopOperation()
        ];
    }

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
