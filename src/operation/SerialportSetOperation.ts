import {Operation, OperationType} from "./Operation";

export class SerialportSetOperation extends Operation {

    constructor() {
        super("serialport/set", OperationType.WRITE);
    }

    public async execute(data: any): Promise<any> {
        this.arduinoPort().setPort(data.name);
    }
}
