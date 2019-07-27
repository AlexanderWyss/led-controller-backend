import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {LEDController} from "./LEDController";

export class WaveController extends LEDController {

    constructor(arduinoPort: ArduinoPort) {
        super(arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        const query = req.query;
        return this.setSpeed(query.speed)
            && this.setSize(query.size)
            && this.setReturn(query.returnValue);

    }

    public setColor(red: number, green: number, blue: number) {
        this.setSingleColor("Red", red);
        this.setSingleColor("Green", green);
        this.setSingleColor("Blue", blue);
        return true;
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

    public setValue(name: string, pin: string, value: any) {
        this.sendCommand("!Wave" + name + value);
    }

    public start(): void {
        this.sendCommand("!WaveRun");
    }

    private setNumber(name: string, number: number): boolean {
        if (!this.validate(number)) {
            return false;
        }
        this.setValue(name, "", number);
        return true;
    }

    private setSingleColor(color: string, value: number) {
        this.setValue("Color", color, value);
    }

    private validate(number: number): boolean {
        return !(number > 1000 && number < 0);
    }
}
