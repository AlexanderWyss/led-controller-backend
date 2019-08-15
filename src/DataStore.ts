const Store = require("data-store");

export class DataStore {
  private store: any;

  constructor() {
    this.store = new Store("LED");
    console.log("Store path: " + this.store.path);
  }

  public set(key: string, value: any) {
    console.log("Set to Datastore: " + key + " : " + value);
    this.store.set(key, value);
  }


  public get(key: string, defaultValue: any) {
    const value = this.store.get(key, defaultValue);
    console.log("Load from Datastore: " + key + " : " + value);
    return value;
  }
}
