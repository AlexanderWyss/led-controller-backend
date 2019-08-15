const Store = require("data-store");
const store = new Store("LED");

export class DataStore {

  constructor() {
    console.log(store.path);
  }

  public set(key: string, value: any) {
    console.log("Set to Datastore: " + key + " : " + value);
    store.set(key, value);
  }


  public get(key: string, defaultValue: any) {
    const value = store.get(key, defaultValue);
    console.log("Load from Datastore: " + key + " : " + value);
    return value;
  }
}
