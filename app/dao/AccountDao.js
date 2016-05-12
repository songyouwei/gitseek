import React from "react";
import {AsyncStorage} from "react-native";

const STORAGE_KEY_ACCOUNT = "STORAGE_KEY_ACCOUNT";

export default class AccountDao {

  static clear() {
    AsyncStorage.removeItem(STORAGE_KEY_ACCOUNT, null);
  }

  static get(): Promise {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_KEY_ACCOUNT).then(data => {
        let account = JSON.parse(data);
        account && resolve(account);
      }, err => {
        reject(err);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static set(account: Object): Promise {
    return new Promise(function(resolve, reject) {
      AsyncStorage.setItem(STORAGE_KEY_ACCOUNT, JSON.stringify(account)).then(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
