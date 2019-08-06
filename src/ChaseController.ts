import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class ChaseController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Chase", arduinoPort);
    }

    public setFromQuery(query: any): boolean {
        return this.setSpeed(query.speed);
    }

    public setSpeed(number: number): boolean {
        return this.setNumber("Speed", number);
    }
}
