import {Operation, OperationType} from './Operation';

export class LedsSetOperation extends Operation {

    constructor() {
        super('leds/set', OperationType.WRITE);
    }

    public async execute(data?: any): Promise<void> {
        this.generalController().setNumberOfLeds(data.leds);
    }
}
