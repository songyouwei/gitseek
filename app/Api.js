import {Actions} from 'react-native-router-flux';
import Octokat from 'octokat';
import EventEmitter from 'EventEmitter';
import AccountDao from './dao/AccountDao';
import SearchHistoryDao from './dao/SearchHistoryDao';
import CacheDao from './dao/CacheDao';

const AppState = {
  logined: false,
  // account: null,
  account: {
    login: 'songyouwei',
    password: 'syw05535812531',
  },
  user: null,
};
export default class Api {

  static octo = new Octokat();

  static init(): void {
    AccountDao.get().then(account => {
      AppState.account = account;
      if(account.login && account.password) Api.octo = new Octokat({
        login: account.login,
        password: account.password,
      });
    });
  }

  static logined(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (AppState.account) resolve(true);
      else AccountDao.get().then(res => resolve(true), err => resolve(false));
    });
  }

  static login(login: String, password: String): Promise<boolean> {
    AppState.account = {
      login: login,
      password: password,
    };
  }

  static logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (AppState.account) resolve(AppState.account);
      else AccountDao.get().then(res => resolve(true), err => resolve(false));
    });
  }

  static getLoggedUser(): Promise<User> {
    if (AppState.user)
      return new Promise((resolve, reject) => {
        resolve(AppState.user);
      });
    else return Api.octo.users(AppState.account.login).fetch();
  }

  static getFeeds(): Promise<Feed[]> {
    if(AppState.account && AppState.account.login)
      return Api.octo.users(AppState.account.login).receivedEvents.fetch({per_page: config.pageSize});
    else return new Promise(function(resolve, reject) {
      reject("account is null");
    });
  }

  static getTrends(language: string): Promise<SearchResult> {
    // let current = new Date();
    // let lengthOfADay = 86400000;//1000*60*60*24
    // let lastDay = new Date(current.valueOf() - lengthOfADay);
    // let lastWeek = new Date(current.valueOf() - lengthOfADay*7);
    // let lastMonth = new Date(current.valueOf() - lengthOfADay*30);
    //
    // let queryDate = lastWeek.toISOString();
    // language = language? 'language:'+language : undefined;
    // let pushed = 'pushed:>' + queryDate;
    //
    // let q = pushed + ' ' + language;
    // return Api.octo.search.repositories.fetch({per_page: config.pageSize, sort: 'stars', q: q});

    let url = 'http://trending.codehub-app.com/v2/trending' + '?since=daily&language=' + language;
    return new Promise((resolve, reject) => {
      fetch(url).then(res => {
        if (res.status<200 && res.status>=300) reject('fetch error');
	      return res.json();
      }).then(res => {
        res instanceof Array && resolve(res);
      });
    });
  }

  static search(keyword: String): Promise<SearchResult> {
    SearchHistoryDao.add(keyword);
    return Api.octo.search.repositories.fetch({per_page: config.pageSize, q: keyword});
  }

  static getSearchHistorys(): Promise<string[]> {
    return SearchHistoryDao.get();
  }

  static clearSearchHistorys(): void {
    SearchHistoryDao.clear();
  }

  static getCacheSize(): Promise<string> {
    return new Promise((resolve, reject) => {
      CacheDao.getCacheSize(res => {
        res.success?resolve(res.data):reject(res.data);
      });
    });
  }

  static clearCache(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      CacheDao.clearCache(res => {
        resolve(res.success);
      });
    });
  }

};
