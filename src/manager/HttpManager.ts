import {Router} from "express";
import {AuthService} from "../AuthService";
import {Operation} from "../operation/Operation";
import {Manager} from "./Manager";

export class HttpManager extends Manager {

  private auth = AuthService.get();

  constructor(private router: Router) {
    super();
  }

  public read(operation: Operation): void {
    this.router.get(operation.name, (req: any, res: any, next: any) => {
      if (this.auth.validate(req.query)) {
        operation.execute().then(returnValue => res.send(returnValue));
      } else {
        this.send401(res);
      }
    });
  }

  public write(operation: Operation): void {
    this.router.get(operation.name, (req: any, res: any, next: any) => {
      if (this.auth.validate(req.query)) {
        operation.execute(req.query).then(val => res.send());
      } else {
        this.send401(res);
      }
    });
  }

  private send401(res: any) {
    res.status(401);
    res.send("You shall not pass");
  }

  protected finalize(): void {
    // noop
  }
}
