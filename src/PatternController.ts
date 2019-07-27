import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {LEDController} from "./LEDController";

export abstract class PatternController extends LEDController {

    protected constructor(public name: string, protected port: ArduinoPort) {
        super(port);
    }

    public abstract setFromQuery(req: Request): boolean;

    public start(): void {
        this.sendCommand("!" + this.name + "Run");
    }

    public setValue(name: string, pin: string, value: any) {
        this.sendCommand("!" + this.name + name + value);
    }

    protected setNumber(name: string, number: number): boolean {
        if (!this.validate(number)) {
            return false;
        }
        this.setValue(name, "", number);
        return true;
    }

    protected setRGBColor(red: number, green: number, blue: number) {
        this.setSingleColor("Red", red);
        this.setSingleColor("Green", green);
        this.setSingleColor("Blue", blue);
        return true;
    }

    protected setSingleColor(color: string, value: number) {
        this.setValue("Color", color, value);
    }

    protected validate(number: number): boolean {
        return !(number > 1000 && number < 0);
    }
}
