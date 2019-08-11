import {ArduinoPort} from "../ArduinoPort";
import {ChaseController} from "./ChaseController";
import {RainbowController} from "./RainbowController";
import {RiderController} from "./RiderController";
import {RunningController} from "./RunningController";
import {SparkleController} from "./SparkleController";
import {StrobeController} from "./StrobeController";
import {WaveController} from "./WaveController";

export class PatternService {
  public static getPatternControllers(arduinoPort: ArduinoPort) {
    return [
      new WaveController(arduinoPort), new RainbowController(arduinoPort), new RiderController(arduinoPort),
      new StrobeController(arduinoPort), new RunningController(arduinoPort), new ChaseController(arduinoPort),
      new SparkleController(arduinoPort)
    ];
  }
}
