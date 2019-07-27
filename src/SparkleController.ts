import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class SparkleController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Sparkle", arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        const query = req.query;
        return this.setDelay(query.delay);
    }

    public setDelay(number: number): boolean {
        return this.setNumber("Delay", number);
    }
}
