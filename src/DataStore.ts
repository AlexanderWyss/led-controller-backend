const Store = require("data-store");

export class DataStore {
  private store: any;

  private static DATA_STORE: DataStore;

  private constructor() {
    this.store = new Store("LED");
    console.log("Store path: " + this.store.path);
  }

  public static get(): DataStore {
    if (!DataStore.DATA_STORE) {
      DataStore.DATA_STORE = new DataStore();
    }
    return DataStore.DATA_STORE;
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
