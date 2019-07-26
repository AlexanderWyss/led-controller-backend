import SerialPort = require("serialport");

export class ArduinoPort {
    public port: SerialPort;

    constructor() {
        this.port = new SerialPort("COM7", { baudRate: 115200 });
    }

    public write(command: string) {
        this.port.write(command, "utf8");
    }

    public read() {
        return this.port.read();
    }
}
