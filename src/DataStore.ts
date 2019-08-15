const Store = require("data-store");
const store = new Store("LED", {path: ""});

export class DataStore {

  constructor() {
    console.log("Store path: " + store.path);
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
