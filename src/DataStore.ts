import {Store} from "data-store";

export class DataStore {
  private store: Store;

  constructor() {
    this.store = new Store("LED");
  }

  public set(key: string, value: any) {
    this.store.set(key, value);
  }


  public get(key: string, defaultValue: any) {
    return this.store.get(key, defaultValue);
  }
}
