const Store = require("data-store");
const store = new Store("LED");

export class DataStore {

  public set(key: string, value: any) {
    store.set(key, value);
  }


  public get(key: string, defaultValue: any) {
    return store.get(key, defaultValue);
  }
}
