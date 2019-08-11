import {Operation, OperationType} from "./Operation";

export class StartOperation extends Operation {

  constructor() {
    super("start", OperationType.WRITE);
  }

  public async execute(data?: any): Promise<void> {
    const pattern = data.pattern;
    const controller = this.getPatternController(pattern);
    controller.start();
  }
}
