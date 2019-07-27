import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class ChaseController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Chase", arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        const query = req.query;
        return this.setSpeed(query.speed);
    }

    public setSpeed(number: number): boolean {
        return this.setNumber("Speed", number);
    }
}
