import {ArduinoPort} from "../ArduinoPort";

export abstract class LEDController {

  private queue: string[] = [];
  private currentCommand: Promise<void>;

  protected constructor(protected port: ArduinoPort) {
  }

  public async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected sendCommand(command: string) {
    this.queue.push(command);
    if (!this.currentCommand) {
      this.currentCommand = this.commandFromQueue();
      this.currentCommand.then(() => this.currentCommand = undefined).catch(error => {
        console.log(error);
        this.currentCommand = undefined;
      });
    }
  }

  private async commandFromQueue() {
    while (this.queue.length > 0) {
      const command = this.queue.shift();
      console.debug(command);
      this.port.write(command);
      await this.delay(150);
    }
  }
}
