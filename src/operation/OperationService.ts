import {AllOffOperation} from "./AllOffOperation";
import {LedsGetOperation} from "./LedsGetOperation";
import {LedsSetOperation} from "./LedsSetOperation";
import {Operation} from "./Operation";
import {OptionsOperation} from "./OptionsOperation";
import {PinGetOperation} from "./PinGetOperation";
import {PinSetOperation} from "./PinSetOperation";
import {SerialportGetOperation} from "./SerialportGetOperation";
import {SerialportSetOperation} from "./SerialportSetOperation";
import {StartOperation} from "./StartOperation";
import {StopOperation} from "./StopOperation";

export class OperationService {
  public static getOperations(): Operation[] {
    return [
      new AllOffOperation(), new LedsSetOperation(), new LedsGetOperation(), new OptionsOperation(),
      new PinSetOperation(), new PinGetOperation(), new SerialportGetOperation(), new SerialportSetOperation(),
      new StartOperation(), new StopOperation()
    ];
  }
}
