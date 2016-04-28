import React, {
  AsyncStorage,
}  from 'react-native';

const STORAGE_KEY_SEARCH_HISTORY = "STORAGE_KEY_SEARCH_HISTORY";

export default class SearchHistoryDao {
  static add(keyword: string) {
    AsyncStorage.getItem(STORAGE_KEY_SEARCH_HISTORY, (err, res)=>{
      if(!res) {
        if(!err) {
          let historys = [];
          historys.push(keyword);
          AsyncStorage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(historys));
        } else {
          console.log("SearchHistoryDao add error");
        }
      }
      else {
        let historys = JSON.parse(res);
        historys = historys.slice(historys.length-4>0?historys.length-4:0, historys.length);
        historys = historys.filter((element,index,array)=>element!==keyword);
        historys.push(keyword);
        AsyncStorage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(historys));
      }
    });
  }

  static clear() {
    AsyncStorage.removeItem(STORAGE_KEY_SEARCH_HISTORY, null);
  }

  static get(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_KEY_SEARCH_HISTORY, (err, res)=>{
        if(!res) reject("SearchHistoryDao get error");
        else {
          let historys = JSON.parse(res);
          historys = historys.slice(historys.length-5>0?historys.length-5:0, historys.length);
          resolve(historys);
        }
      });
    });
  }
};
