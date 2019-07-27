import {Request} from "express";
import {ArduinoPort} from "./ArduinoPort";
import {LEDController} from "./LEDController";

export class GeneralController extends LEDController {

    constructor(arduinoPort: ArduinoPort) {
        super(arduinoPort);
    }

    public setFromQuery(req: Request): boolean {
        return false;
    }

    public start(): void {
    }

    public stop(): void {
        this.sendCommand("!NeoStop");
    }

    public allOff(): void {
        this.stop();
        this.sendCommand("!NeoAllOff");
    }
}
