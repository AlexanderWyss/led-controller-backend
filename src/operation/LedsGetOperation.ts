import {Operation, OperationType} from "./Operation";

export class LedsGetOperation extends Operation {

  constructor() {
    super("leds/get", OperationType.READ);
  }

  public async execute(): Promise<any> {
    return {leds: this.generalController().getNumberOfLeds().toString()};
  }
}
