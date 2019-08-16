import hashString from "object-hash";
import * as Otplib from "otplib";
import {DataStore} from "./DataStore";

export class AuthService {
  private static AUTH_SERVICE: AuthService;
  private readonly hash: string;

  private constructor() {
    const key = DataStore.get().get("authKey", undefined);
    if (key) {
      this.hash = hashString(key);
      console.log("Use Key with hash: " + this.hash);
    }
  }

  public static get(): AuthService {
    if (!AuthService.AUTH_SERVICE) {
      AuthService.AUTH_SERVICE = new AuthService();
    }
    return AuthService.AUTH_SERVICE;
  }

  public validate(query: any): boolean {
    if (this.hash) {
      return Otplib.totp.check(query.t, this.hash);
    }
    return true;
  }
}
