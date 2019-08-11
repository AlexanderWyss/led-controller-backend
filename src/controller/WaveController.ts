import {ArduinoPort} from "../ArduinoPort";
import {PatternController} from "./PatternController";

export class WaveController extends PatternController {

  constructor(arduinoPort: ArduinoPort) {
    super("Wave", arduinoPort);
  }

  public setFromQuery(query: any): boolean {
    return this.setSpeed(query.speed)
      && this.setSize(query.size)
      && this.setReturn(query.returnValue)
      && this.setColor(query.color);
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

  public setColor(color: string): boolean {
    return this.setRGBColor(color);
  }
}
