import SerialPort = require("serialport");

export class ArduinoPort {
    public static get(): ArduinoPort {
        if (!ArduinoPort.PORT) {
            ArduinoPort.PORT = new ArduinoPort();
        }
        return ArduinoPort.PORT;
    }

    private static PORT: ArduinoPort;
    public port: SerialPort;

    constructor() {
        this.setPort();
    }

    public write(command: string) {
        this.checkPort();
        this.port.write(command, "utf8");
    }

    public read() {
        return this.port.read();
    }

    private checkPort() {
        if (!this.port || !this.port.isOpen) {
            this.setPort();
        }
    }

    private setPort() {
        if (this.port && this.port.isOpen) {
            this.port.close();
        }
        SerialPort.list().then((ports) => {
            console.log(ports);
            const filteredPorts = ports.filter((port) => port.productId == "7523");
            if (filteredPorts.length > 0) {
                console.log(filteredPorts[0].comName);
                this.port = new SerialPort(filteredPorts[0].comName, {baudRate: 115200});
                this.port.on("error", (error) => {
                    console.log(error);
                    this.setPort();
                });
            }
        });
    }
}
