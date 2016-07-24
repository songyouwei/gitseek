import React from "react";
import {AsyncStorage} from "react-native";

const STORAGE_KEY_ACCOUNT = "STORAGE_KEY_ACCOUNT";

export default class AccountDao {

  static clear() {
    AsyncStorage.removeItem(STORAGE_KEY_ACCOUNT);
  }

  static get(): Promise {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_KEY_ACCOUNT).then(account => {
        if (account) resolve(JSON.parse(account));
        else reject();
      });
    });
  }

  static set(account: Object): Promise {
    return AsyncStorage.setItem(STORAGE_KEY_ACCOUNT, JSON.stringify(account));
  }
}
