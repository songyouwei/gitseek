import RNFS from 'react-native-fs';

export default class CacheDao {

  static cacheDirectory = `${RNFS.CachesDirectoryPath}/com.gitseek`;

  static getCacheSize(callback) {
    let totalSize = 0;
    RNFS.readDir(CacheDao.cacheDirectory).then((files) => {
      let dirs = [];
      files.map((file) => {
        if(file.isFile()) totalSize += file.size;
        else dirs.push(RNFS.readDir(file.path));
      });
      return Promise.all(dirs);
    }).then((dirs) => {
      dirs.map((fs) => {
        fs.map((f) => totalSize += f.size);
      });
    }).catch((err) => {
      console.log(err.message);
    }).finally(() => {
      totalSize = `${(totalSize/1048576).toFixed(1)}MB`;
      if(callback) callback({success: true, data: totalSize});
    });
  }

  static clearCache(callback) {
    RNFS.unlink(CacheDao.cacheDirectory)
      // spread is a method offered by bluebird to allow for more than a
      // single return value of a promise. If you use `then`, you will receive
      // the values inside of an array
      .spread((success, path) => {
        console.log('FILE DELETED', success, path);
        callback({success: true, data: null});
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
        callback({success: false, data: err.message});
      });
  }

};
