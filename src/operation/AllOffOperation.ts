import {Operation, OperationType} from './Operation';

export class AllOffOperation extends Operation {

    constructor() {
        super('alloff', OperationType.READ);
    }

    public async execute(): Promise<void> {
        this.generalController().allOff();
    }
}
