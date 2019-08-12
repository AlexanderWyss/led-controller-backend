import SerialPort = require("serialport");
import {PortInfo} from "serialport";
import {BluetoothManager} from "./manager/BluetoothManager";

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
    this.createPort(portName);
  }

  public getSerialPorts(): Promise<PortInfo[]> {
    return this.filterPorts(SerialPort.list());
  }

  private filterPorts(serialports: Promise<PortInfo[]>) {
    return serialports.then(ports => ports.filter(port => port.comName !== BluetoothManager.getBluetoothSerialPort()));
  }

  private checkPort() {
    if (!this.port || !this.port.isOpen) {
      this.createPort();
    }
  }

  private createPort(portName = this.selectedPort) {
    this.closePort();
    if (portName === "autoselect" || !portName) {
      SerialPort.list().then(ports => {
        console.debug(ports);
        const filteredPorts = ports.filter(port => port.productId === "7523");
        if (filteredPorts.length > 0) {
          const autoselectedPort = filteredPorts[0].comName;
          this.selectedPort = autoselectedPort;
          this.port = this.createSerialPort(autoselectedPort);
        }
      });
    } else {
      this.selectedPort = portName;
      this.port = this.createSerialPort(portName);
    }
  }

  private createSerialPort(portName: string) {
    console.debug(portName);
    const port = new SerialPort(portName, {baudRate: 115200});
    port.on("error", error => {
      console.error(error);
      if (this.port.isOpen) {
        this.port.close();
        this.createPort(portName);
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
