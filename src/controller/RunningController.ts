import {ArduinoPort} from "../ArduinoPort";
import {PatternController} from "./PatternController";

export class RunningController extends PatternController {

  constructor(arduinoPort: ArduinoPort) {
    super("Running", arduinoPort);
  }

  public setFromQuery(query: any): boolean {
    return this.setSpeed(query.speed) && this.setColor(query.color);
  }

  public setSpeed(number: number): boolean {
    return this.setNumber("Speed", number);
  }

  public setColor(color: string) {
    return this.setRGBColor(color);
  }
}
