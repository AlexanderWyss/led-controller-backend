import {Operation, OperationType} from './Operation';

export class StopOperation extends Operation {

    constructor() {
        super('stop', OperationType.READ);
    }

    public async execute(): Promise<void> {
        this.generalController().stop();
    }
}
