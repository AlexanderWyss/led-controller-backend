import SerialPort = require("serialport");

export class ArduinoPort {
    public port: SerialPort;

    constructor() {
        this.setPort();
    }

    public write(command: string) {
        this.port.write(command, "utf8");
    }

    public read() {
        return this.port.read();
    }

    private setPort() {
        SerialPort.list().then((ports) => {
            const filteredPorts = ports.filter((port) => port.productId == "7523");
            if (filteredPorts.length > 0) {
                if (this.port && this.port.isOpen) {
                    this.port.close();
                }
                this.port = new SerialPort(filteredPorts[0].comName, {baudRate: 115200});
                this.port.on('error', error => {
                    this.setPort();
                })
            }
        });
    }
}
