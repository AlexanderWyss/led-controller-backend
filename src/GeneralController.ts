import {ArduinoPort} from "./ArduinoPort";
import {LEDController} from "./LEDController";

export class GeneralController extends LEDController {

    constructor(arduinoPort: ArduinoPort) {
        super(arduinoPort);
    }

    public stop(): void {
        this.sendCommand("!NeoStop");
    }

    public allOff(): void {
        this.stop();
        this.sendCommand("!NeoAllOff");
    }

    public setNumberOfLeds(number: number) {
        this.sendCommand("!NeoNum" + number);
    }

    public setPin(pin: string) {
        this.sendCommand("!NeoPin" + pin);
    }
}
