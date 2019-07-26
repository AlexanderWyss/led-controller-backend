import {Request} from "express";
import { ArduinoPort} from "./ArduinoPort";

export abstract class LEDController {

    protected port: ArduinoPort;

    protected constructor() {
        this.port = ArduinoPort.get();
    }

    public abstract setFromQuery(req: Request): boolean;

    public abstract start(): void;

    protected sendCommand(command: string) {
        console.log(command);
        this.port.write(command);
    }

}
