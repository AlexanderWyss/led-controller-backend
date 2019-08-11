import {ArduinoPort} from "../ArduinoPort";
import {LEDController} from "./LEDController";

export class GeneralController extends LEDController {
  private numberOfLeds = 13;
  private pin = "3";

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
    this.numberOfLeds = number;
    this.sendCommand("!NeoNum" + number);
  }

  public getNumberOfLeds(): number {
    return this.numberOfLeds;
  }

  public setPin(pin: string) {
    this.pin = pin;
    this.sendCommand("!NeoPin" + pin);
  }

  public getPin(): string {
    return this.pin;
  }
}
