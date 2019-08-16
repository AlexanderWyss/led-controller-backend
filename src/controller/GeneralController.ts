import {ArduinoPort} from "../ArduinoPort";
import {DataStore} from "../DataStore";
import {LEDController} from "./LEDController";

export class GeneralController extends LEDController {
  private numberOfLeds = 13;
  private pin = "3";
  private static NUMBER_OF_LEDS = "numberOfLeds";
  private static PIN = "pin";
  private store: DataStore;

  constructor(arduinoPort: ArduinoPort) {
    super(arduinoPort);
    this.store = DataStore.get();
    this.numberOfLeds = this.store.get(GeneralController.NUMBER_OF_LEDS, 13);
    this.pin = this.store.get(GeneralController.PIN, "3");
  }

  public stop(): Promise<void> {
    return this.sendCommand("!NeoStop");
  }

  public allOff(): Promise<void> {
    return this.stop().then(() => {
      return this.sendCommand("!NeoAllOff");
    });
  }

  public setNumberOfLeds(number: number) {
    this.numberOfLeds = number;
    this.store.set(GeneralController.NUMBER_OF_LEDS, number);
    this.sendCommand("!NeoNum" + number);
  }

  public getNumberOfLeds(): number {
    return this.numberOfLeds;
  }

  public setPin(pin: string) {
    this.pin = pin;
    this.store.set(GeneralController.PIN, pin);
    this.sendCommand("!NeoPin" + pin);
  }

  public getPin(): string {
    return this.pin;
  }
}
