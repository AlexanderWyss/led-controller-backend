import {ArduinoPort} from "../ArduinoPort";
import {PatternController} from "./PatternController";

export class StripController extends PatternController {

  constructor(arduinoPort: ArduinoPort) {
    super("Neo", arduinoPort);
  }

  // Override
  public start(): void {
    this.sendCommand("!" + this.name + "SetStrip");
  }

  public setFromQuery(query: any): boolean {
    return this.setColor(query.color);
  }

  public setColor(color: string): boolean {
    return this.setRGBColor(color);
  }
}
