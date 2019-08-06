import {ArduinoPort} from "./ArduinoPort";
import {PatternController} from "./PatternController";

export class StrobeController extends PatternController {

    constructor(arduinoPort: ArduinoPort) {
        super("Strobe", arduinoPort);
    }

    public setFromQuery(query: any): boolean {
        return this.setNumberOfFlashes(query.numberOfFlashes)
            && this.setFlashDelay(query.flashDelay)
            && this.setFlashEndDelay(query.endDelay)
            && this.setColor(query.color);
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

    public setColor(color: string) {
        return this.setRGBColor(color);
    }
}
