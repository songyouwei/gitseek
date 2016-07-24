import {AsyncStorage} from "react-native";
import {Actions} from 'react-native-router-flux';
import Octokat from 'octokat';
import base64 from 'base-64';
import EventEmitter from 'EventEmitter';
import SearchHistoryDao from './dao/SearchHistoryDao';
import CacheDao from './dao/CacheDao';
import config from './config';

const STORAGE_KEY_ACCOUNT = "STORAGE_KEY_ACCOUNT";

const AppState = {
  account: null,
};
let octo = new Octokat();
export default class Api {

  static init(): void {
    Api.getLocalAccount().then(account => {
      if (account && account.login && account.password) {
        AppState.account = account;
        octo = new Octokat({
          username: account.login,
          password: account.password,
        });
      }
    });
  }

  static logined() {
    return !!AppState.account;
  }

  static login(login: String, password: String): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tempOcto = new Octokat({
        username: login,
        password: password,
      });
      tempOcto.me.fetch().then(
        user => {
          user['password'] = password;
          AppState.account = user;
          AsyncStorage.setItem(STORAGE_KEY_ACCOUNT, JSON.stringify(user));
          octo = tempOcto;
          resolve(user);
        },
        err => {
          reject(err.json.message);
        }
      );
    });
  }

  static logout(): Promise<boolean> {
    AppState.account = null;
    AsyncStorage.removeItem(STORAGE_KEY_ACCOUNT);
    octo = new Octokat();
  }

  static getLocalAccount(): Promise {
    return new Promise((resolve, reject) => {
      if (AppState.account) resolve(AppState.account);
      else AsyncStorage.getItem(STORAGE_KEY_ACCOUNT).then(account => {
        AppState.account = JSON.parse(account);
      });
    });
  }

  static getUser(userLogin = AppState.account.login : stirng): Promise<User> {
    return new Promise((resolve, reject) => {
      octo.users(userLogin).read().then(res => {
        resolve(JSON.parse(res));
      }, err => reject(err));
    });
  }

  static getUserStarsCount(userLogin = AppState.account.login : string): Promise<number> {
    return new Promise((resolve, reject) => {
      octo.users(userLogin).starred.fetch({per_page: 1}).then(res => {
        let splitted = res.lastPageUrl && res.lastPageUrl.split('=');
        let starsCount = splitted?splitted[splitted.length-1]:0;
        resolve(starsCount);
      });
    });
  }

  static getUserRepos(userLogin = AppState.account.login : string): Promise<RepoItem[]> {
    return octo.users(userLogin).repos.fetch({sort: 'stars'});
  }

  static getFeeds(): Promise<Feed[]> {
    if(AppState.account && AppState.account.login)
      return octo.users(AppState.account.login).receivedEvents.fetch({per_page: config.pageSize});
    else return new Promise(function(resolve, reject) {
      reject("account is null");
    });
  }

  static getTrends(language: string): Promise<SearchResult> {
    let url = 'http://trending.codehub-app.com/v2/trending' + '?since=daily&language=' + language;
    return octo.fromUrl(url).fetch();
  }

  static getRoughTrends(language: string): Promise<SearchResult> {
    return new Promise((resolve, reject) => {
      let yesterday = new Date(new Date().getTime() - 1000 * 60 * 60 * 24).toISOString();
      octo.search.repositories.fetch({
        sort: 'stars',
        page: 1,
        q: `language:${language} pushed:>${yesterday}`,
      }).then(res => {
        res = res.items;
        res['nextPage'] = res.nextPage;
        resolve(res);
      }, err => reject(err));
    });
  }

  static search(keyword: String): Promise<SearchResult> {
    SearchHistoryDao.add(keyword);
    return octo.search.repositories.fetch({per_page: config.pageSize, q: keyword});
  }

  static getSearchHistorys(): Promise<string[]> {
    return SearchHistoryDao.get();
  }

  static clearSearchHistorys(): void {
    SearchHistoryDao.clear();
  }

  static getOrgaPeople(orga: Organizaiton): Promise<People[]> {
    return octo.orgs(orga.login).members.fetch({per_page: config.pageSize});
  }

  static followed(userLogin = AppState.account.login : stirng): Promise<Boolean> {
    return octo.me.following.contains(userLogin);
  }

  static follow(userLogin = AppState.account.login : stirng): Promise<Boolean> {
    return octo.me.following(userLogin).add();
  }

  static unfollow(userLogin = AppState.account.login : stirng): Promise<Boolean> {
    return octo.me.following(userLogin).remove();
  }

  static starRepo(repo : repo) : Promise<Boolean> {
    return octo.me.starred(repo.owner.login, repo.name).add();
  }

  static unStarRepo(repo : repo) : Promise<Boolean> {
    return octo.me.starred(repo.owner.login, repo.name).remove();
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
