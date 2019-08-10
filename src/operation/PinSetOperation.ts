import {Operation, OperationType} from './Operation';

export class PinSetOperation extends Operation {

    constructor() {
        super('pin/set', OperationType.WRITE);
    }

    public async execute(data?: any): Promise<void> {
        this.generalController().setPin(data.pin);
    }
}
