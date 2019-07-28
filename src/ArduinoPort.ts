import SerialPort = require("serialport");

export class ArduinoPort {

    public static get(): ArduinoPort {
        if (!ArduinoPort.PORT) {
            ArduinoPort.PORT = new ArduinoPort();
        }
        return ArduinoPort.PORT;
    }

    private static PORT: ArduinoPort;
    public selectedPort: string;
    public port: SerialPort;

    private constructor() {
        console.log("constr");
        this.createPort();
    }

    public write(command: string) {
        this.checkPort();
        this.port.write(command, "utf8");
    }

    public read() {
        this.port.read();
    }

    public setPort(portName: string) {
        this.selectedPort = portName;
        this.createPort();
    }

    public getSerialPorts(): Promise<SerialPort.PortInfo[]> {
        return SerialPort.list();
    }

    private checkPort() {
        if (!this.port || !this.port.isOpen) {
            this.createPort();
        }
    }

    private createPort() {
        this.closePort();
        if (this.selectedPort != undefined) {
            this.port = this.createSerialPort(this.selectedPort);
        } else {
            SerialPort.list().then((ports) => {
                console.debug(ports);
                const filteredPorts = ports.filter((port) => port.productId == "7523");
                if (filteredPorts.length > 0) {
                    this.port = this.createSerialPort(filteredPorts[0].comName);
                }
            });
        }
    }

    private createSerialPort(portName: string) {
        console.debug(portName);
        const port = new SerialPort(portName, {baudRate: 115200});
        port.on("error", (error) => {
            console.error(error);
            if (this.port.isOpen) {
                this.port.close();
                this.createPort();
            }
        });
        return port;
    }

    private closePort() {
        if (this.port && this.port.isOpen) {
            this.port.close();
        }
    }
}
