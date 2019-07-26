import SerialPort = require("serialport");

export class ArduinoPort {
    public port: SerialPort;

    constructor() {
        SerialPort.list().then((ports) => {
            this.port = new SerialPort(ports.filter((port) => port.productId == "7523")[0].comName, { baudRate: 115200 });
        });
    }

    public write(command: string) {
        this.port.write(command, "utf8");
    }

    public read() {
        return this.port.read();
    }
}
