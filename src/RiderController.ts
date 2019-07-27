import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class RiderController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Rider", arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        const query = req.query;
        return this.setSpeed(query.speed)
            && this.setLength(query.length);
    }

    public setSpeed(number: number): boolean {
        return this.setNumber("Speed", number);
    }

    public setLength(number: number) {
        return this.setNumber("Length", number);
    }
}
