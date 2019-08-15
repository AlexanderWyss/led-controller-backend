import {ArduinoPort} from "../ArduinoPort";

export abstract class LEDController {

  private queue: string[] = [];
  private currentCommand: Promise<void>;

  protected constructor(protected port: ArduinoPort) {
  }

  public async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async ready(): Promise<void> {
    if (this.currentCommand) {
      return this.currentCommand;
    }
  }

  protected sendCommand(command: string) {
    console.log("push" + command);
    this.queue.push(command);
    if (!this.currentCommand) {
      this.currentCommand = this.commandFromQueue();
      this.currentCommand
        .catch(error => console.log(error))
        .finally(() => {
          this.currentCommand = undefined;
        });
    }
  }

  private async commandFromQueue(): Promise<void> {
    while (this.queue.length > 0) {
      const command = this.queue.shift();
      console.debug(command);
      this.port.write(command);
      await this.delay(150);
    }
  }
}
