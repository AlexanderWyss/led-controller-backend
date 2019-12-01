import {CronJob} from "cron";
import {ArduinoPort} from "../ArduinoPort";
import {DataStore} from "../DataStore";
import {LEDController} from "./LEDController";
import {PatternController} from "./PatternController";
import {PatternService} from "./PatternService";

interface Cron {
    cron: string;
    pattern: string;
}

export class GeneralController extends LEDController {
    private static NUMBER_OF_LEDS = "numberOfLeds";
    private static PIN = "pin";
    private static CRON = "cron";
    private numberOfLeds = 13;
    private pin = "3";
    private store: DataStore;
    private controllers: PatternController[];

    constructor(arduinoPort: ArduinoPort) {
        super(arduinoPort);
        this.controllers = PatternService.getPatternControllers(arduinoPort);
        this.store = DataStore.get();
        this.numberOfLeds = this.store.get(GeneralController.NUMBER_OF_LEDS, 13);
        this.pin = this.store.get(GeneralController.PIN, "3");
        for (const cronJob of this.getCronJobs()) {
            this.scheduleJob(cronJob);
        }
    }

    public stop(): Promise<void> {
        return this.sendCommand("!NeoStop");
    }

    public allOff(): Promise<void> {
        return this.stop().then(() => {
            return this.sendCommand("!NeoAllOff");
        });
    }

    public setNumberOfLeds(number: number) {
        this.numberOfLeds = number;
        this.store.set(GeneralController.NUMBER_OF_LEDS, number);
        this.sendCommand("!NeoNum" + number);
    }

    public getNumberOfLeds(): number {
        return this.numberOfLeds;
    }

    public setPin(pin: string) {
        this.pin = pin;
        this.store.set(GeneralController.PIN, pin);
        this.sendCommand("!NeoPin" + pin);
    }

    public getPin(): string {
        return this.pin;
    }

    public addCronJob(cron: Cron) {
        this.scheduleJob(cron);
        this.getCronJobs().push(cron);
    }

    public getCronJobs(): Cron[] {
        return this.store.get(GeneralController.CRON, []);
    }

    public removeCronJob(cron: Cron) {
      const cronJobs = this.getCronJobs();
      cronJobs.splice(cronJobs.indexOf(cron), 1);
    }

    private scheduleJob(cronJob: Cron) {
        new CronJob(cronJob.cron, this.getController(cronJob.pattern).start, null, true);
    }

    private getController(name: string) {
        return this.controllers.filter(controller => controller.name.toLowerCase() === name.toLowerCase())[0];
    }
}
