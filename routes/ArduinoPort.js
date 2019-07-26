class ArduinoPort {

    constructor() {
        const SerialPort = require('serialport')
        this.port = new SerialPort('COM7', { baudRate: 115200 });
    }

    write(command) {
        this.port.write(command, 'utf-8')
    }

    read() {
        return this.port.read();
    }
}
module.exports = ArduinoPort;
