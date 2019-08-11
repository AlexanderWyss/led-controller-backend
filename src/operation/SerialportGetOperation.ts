import {Operation, OperationType} from "./Operation";

export class SerialportGetOperation extends Operation {

  constructor() {
    super("serialport/get", OperationType.READ);
  }

  public async execute(): Promise<any> {
    const ports = await this.arduinoPort().getSerialPorts();
    return {serialports: ports};
  }
}
