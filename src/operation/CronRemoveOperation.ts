import {Operation, OperationType} from "./Operation";

export class CronRemoveOperation extends Operation {

  constructor() {
    super("cron/remove", OperationType.WRITE);
  }

  public async execute(data?: any): Promise<void> {
    this.generalController().removeCronJob(data.cron);
  }
}
