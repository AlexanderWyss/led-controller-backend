import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class StrobeController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Strobe", arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        const query = req.query;
        return this.setNumberOfFlashes(query.numberOfFlashes)
            && this.setFlashDelay(query.flashDelay)
            && this.setFlashEndDelay(query.endDelay);
    }

    public setNumberOfFlashes(number: number) {
        return this.setNumber("Flash1_", number);
    }

    public setFlashDelay(number: number) {
        return this.setNumber("FlashDelay", number);
    }

    public setFlashEndDelay(number: number) {
        return this.setNumber("EndDelay", number);
    }

    public setColor(red: number, green: number, blue: number) {
        this.setRGBColor(red, green, blue);
    }
}
