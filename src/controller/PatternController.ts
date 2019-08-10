import {ArduinoPort} from "../ArduinoPort";
import {LEDController} from "./LEDController";
import {WaveController} from './WaveController';
import {RainbowController} from './RainbowController';
import {RiderController} from './RiderController';
import {StrobeController} from './StrobeController';
import {RunningController} from './RunningController';
import {ChaseController} from './ChaseController';
import {SparkleController} from './SparkleController';

export abstract class PatternController extends LEDController {

    protected constructor(public name: string, protected port: ArduinoPort) {
        super(port);
    }

    public static getPatternControllers(arduinoPort: ArduinoPort) {
        return [
            new WaveController(arduinoPort), new RainbowController(arduinoPort), new RiderController(arduinoPort),
            new StrobeController(arduinoPort), new RunningController(arduinoPort), new ChaseController(arduinoPort),
            new SparkleController(arduinoPort)
        ];
    }

    public abstract setFromQuery(query: any): boolean;

    public start(): void {
        this.sendCommand("!" + this.name + "Run");
    }

    public setValue(name: string, pin: string, value: any) {
        this.sendCommand("!" + this.name + name + pin + value);
    }

    protected setNumber(name: string, number: number): boolean {
        if (!this.validate(number)) {
            return false;
        }
        this.setValue(name, "", number);
        return true;
    }

    protected setRGBColor(color: string) {
        const rgb = this.toRGB(color);
        this.setSingleColor("Red", rgb.red);
        this.setSingleColor("Green", rgb.green);
        this.setSingleColor("Blue", rgb.blue);
        return true;
    }

    protected setSingleColor(color: string, value: number) {
        this.setValue("Color", color, value);
    }

    protected validate(number: number): boolean {
        return !(number > 1000 && number < 0);
    }

    private toRGB(color: string) {
        color = color.substr(color.indexOf("#") + 1);
        return {
            red: parseInt(color.substr(0, 2), 16),
            green: parseInt(color.substr(2, 2), 16),
            blue: parseInt(color.substr(4, 2), 16)
        };
    }

}
