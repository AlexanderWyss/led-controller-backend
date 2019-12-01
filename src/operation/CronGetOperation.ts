import {Operation, OperationType} from "./Operation";

export class CronGetOperation extends Operation {

  constructor() {
    super("cron/get", OperationType.READ);
  }

  public async execute(): Promise<any> {
    return {cronJobs: this.generalController().getCronJobs()};
  }
}
