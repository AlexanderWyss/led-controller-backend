import {ArduinoPort} from '../ArduinoPort';
import {WaveController} from './WaveController';
import {RainbowController} from './RainbowController';
import {RiderController} from './RiderController';
import {StrobeController} from './StrobeController';
import {RunningController} from './RunningController';
import {ChaseController} from './ChaseController';
import {SparkleController} from './SparkleController';

export class PatternService {
    public static getPatternControllers(arduinoPort: ArduinoPort) {
        return [
            new WaveController(arduinoPort), new RainbowController(arduinoPort), new RiderController(arduinoPort),
            new StrobeController(arduinoPort), new RunningController(arduinoPort), new ChaseController(arduinoPort),
            new SparkleController(arduinoPort)
        ];
    }
}
