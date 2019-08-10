import {Bleno, Characteristic, PrimaryService} from "@abandonware/bleno";
import {Operation} from "../operation/Operation";
import {Manager} from "./Manager";

const uuidGen = require("uuid/v5");

export class BluetoothManager extends Manager {
    private static UUID = "de7daa74-9126-494c-b277-9ca4c0944c7e";
    private characteristics: Characteristic[] = [];
    private bufferMap: any = {};

    constructor(private bleno: Bleno) {
        super();
    }

    public read(operation: Operation): void {
        const uuid = this.genUuid(operation);
        this.characteristics.push(new Characteristic({
            uuid,
            properties: ["read"],
            onReadRequest: (offset, callback) => {
                this.manageBuffer(offset, operation.name, operation.execute({})).then((value) => {
                    console.log(value);
                    return callback(Characteristic.RESULT_SUCCESS, Buffer.from(value));
                });
            }
        }));
    }

    public write(operation: Operation): void {
        const uuid = this.genUuid(operation);
        this.characteristics.push(new Characteristic({
            uuid,
            properties: ["write"],
            onWriteRequest: (data, offset, withoutResponse, callback) => {
                console.log(data.toString());
                operation.execute(JSON.parse(data.toString())).then((empty) => callback(Characteristic.RESULT_SUCCESS));
            },
        }));
    }

    protected finalize(): void {
        const primaryService = new PrimaryService({
            uuid: BluetoothManager.UUID,
            characteristics: this.characteristics
        });

        this.bleno.on("stateChange", (state: any) => {
            console.log("on -> stateChange: " + state);

            if (state === "poweredOn") {
                this.bleno.startAdvertising("LED", [primaryService.uuid]);
            } else {
                this.bleno.stopAdvertising();
            }
        });

        this.bleno.on("advertisingStart", (error: any) => {
            console.log("on -> advertisingStart: " + (error ? "error " + error : "success"));

            if (!error) {
                this.bleno.setServices([primaryService], (error: any) => {
                    console.log("setServices: " + (error ? "error " + error : "success"));
                });
            }
        });
    }

    private async manageBuffer(offset: number, name: string, promise: Promise<any>): Promise<string> {
        if (offset == 0 || this.bufferMap[name] === undefined) {
            return await promise.then((value) => {
                this.bufferMap[name] = JSON.stringify(value);
                return this.bufferMap[name];
            });
        } else {
            return (this.bufferMap[name] as string).substr(offset);
        }
    }

    private genUuid(operation: Operation) {
        const uuid = uuidGen(operation.name, BluetoothManager.UUID);
        console.log(operation.name + " : " + uuid);
        return uuid;
    }
}
