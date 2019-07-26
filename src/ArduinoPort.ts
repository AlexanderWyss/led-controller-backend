import SerialPort = require("serialport");

export class ArduinoPort {
    public port: SerialPort;

    constructor() {
        this.setPort();
    }

    public write(command: string) {
        try {
            this.port.write(command, "utf8");
        } catch (e) {
            this.setPort();
        }
    }

    public read() {
        return this.port.read();
    }

    private setPort() {
        if (this.port && this.port.isOpen) {
            this.port.close();
        }
        SerialPort.list().then((ports) => {
            this.port = new SerialPort(ports.filter((port) => port.productId == "7523")[0].comName, { baudRate: 115200 }, (error => {this.setPort();}));
        });
    }
}
