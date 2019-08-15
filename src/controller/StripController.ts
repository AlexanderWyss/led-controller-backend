import {ArduinoPort} from "../ArduinoPort";
import {GeneralController} from "./GeneralController";
import {PatternController} from "./PatternController";

export class StripController extends PatternController {
  private readonly generalController: GeneralController;

  constructor(arduinoPort: ArduinoPort) {
    super("Neo", arduinoPort);
    this.generalController = new GeneralController(arduinoPort);
  }

  // Override
  public start(): void {
    this.ready().then(() => {
      this.generalController.allOff().then(() => this.sendCommand("!" + this.name + "SetStrip"));
    });
  }

  public setFromQuery(query: any): boolean {
    return this.setColor(query.color);
  }

  public setColor(color: string): boolean {
    return this.setRGBColor(color);
  }
}
