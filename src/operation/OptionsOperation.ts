import {Operation, OperationType} from "./Operation";

export class OptionsOperation extends Operation {

  constructor() {
    super("options", OperationType.WRITE);
  }

  public async execute(data?: any): Promise<void> {
    const controller = this.getPatternController(data.pattern);
    controller.setFromQuery(data);
  }
}
