import {Router} from "express";
import {Operation} from "../operation/Operation";
import {Manager} from "./Manager";

export class HttpManager extends Manager {

  constructor(private router: Router) {
    super();
  }

  public read(operation: Operation): void {
    this.router.get(operation.name, (req: any, res: any, next: any) => {
      operation.execute().then(returnValue => res.send(returnValue));
    });
  }

  public write(operation: Operation): void {
    this.router.get(operation.name, (req: any, res: any, next: any) => {
      operation.execute(req.query).then(val => res.send());
    });
  }

  protected finalize(): void {
    // noop
  }
}
