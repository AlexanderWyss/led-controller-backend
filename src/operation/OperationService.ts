import {AllOffOperation} from './AllOffOperation';
import {LedsSetOperation} from './LedsSetOperation';
import {OptionsOperation} from './OptionsOperation';
import {PinSetOperation} from './PinSetOperation';
import {SerialportGetOperation} from './SerialportGetOperation';
import {SerialportSetOperation} from './SerialportSetOperation';
import {StartOperation} from './StartOperation';
import {StopOperation} from './StopOperation';
import {Operation} from './Operation';

export class OperationService {
    public static getOperations(): Operation[] {
        return [
            new AllOffOperation(), new LedsSetOperation(), new OptionsOperation(), new PinSetOperation(),
            new SerialportGetOperation(), new SerialportSetOperation(), new StartOperation(), new StopOperation()
        ];
    }
}
