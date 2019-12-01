import {Operation, OperationType} from "./Operation";

export class CronAddOperation extends Operation {

  constructor() {
    super("cron/add", OperationType.WRITE);
  }

  public async execute(data?: any): Promise<void> {
    this.generalController().addCronJob(data.cron);
  }
}
