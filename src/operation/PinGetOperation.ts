import {Operation, OperationType} from "./Operation";

export class PinGetOperation extends Operation {

  constructor() {
    super("pin/get", OperationType.READ);
  }

  public async execute(): Promise<any> {
    return {pin: this.generalController().getPin()};
  }
}
