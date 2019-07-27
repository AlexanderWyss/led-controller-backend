import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class WaveController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Wave", arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        const query = req.query;
        return this.setSpeed(query.speed)
            && this.setSize(query.size)
            && this.setReturn(query.returnValue);
    }

    public setSize(number: number): boolean {
        return this.setNumber("Size", number);
    }

    public setSpeed(number: number): boolean {
        return this.setNumber("Speed", number);
    }

    public setReturn(number: number): boolean {
        return this.setNumber("Return", number);
    }

    public setColor(red: number, green: number, blue: number) {
        this.setRGBColor(red, green, blue);
    }
}
