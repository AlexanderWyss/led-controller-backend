import {Operation, OperationType} from "../operation/Operation";

export abstract class Manager {

  public mapOperations(operations: Operation[]) {
    for (const operation of operations) {
      switch (operation.type) {
        case OperationType.READ:
          this.read(operation);
          break;
        case OperationType.WRITE:
          this.write(operation);
          break;
      }
    }
    this.finalize();
  }

  public abstract read(operation: Operation): void;

  public abstract write(operation: Operation): void;

  protected abstract finalize(): void;
}
