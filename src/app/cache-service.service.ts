import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  
  loaderVisible = false;
  
  constructor() {}

  showLoader() {
    this.loaderVisible = true;
  }

  hideLoader = () => {
    this.loaderVisible = false;
  }

  storeKeys = (obj: any) => {
    for(let key in obj) {
      if(typeof obj[key] == 'string') {
        localStorage.setItem(key, obj[key]);
      } else {
        this.storeKeys(obj[key]);
      }
    }
  }

  getHashsFromServer = () => {

    // You can write API logic to get hash value from server

    const dummyHashs: any = {
      bm_1: 'ahbcuha788734wdchubssdj',
      bm_2: 'kjdf83hjkb34bb23kj43jb32',
      bm_3: '45hjgkl2j3kl4j5h2jkl4j5h2',
      bm_4: 'pl9xnm6b0bnmcv890df9ds83',
      bm_5: {
        bm_5_1: 'qwe1tyu2io3p45aszx6cv7bn8',
        bm_5_2: 'qwe1tyu2io3p45aszsdsdsdcsdc7bn8',
        bm_5_3: 'qwe1tyu2io3p45aascsdcsdcsd'
      },
      bm_6: '987rtyu2qwecvbnmasd3fghjk',
      bm_7: 'p0o9i8u7y6t5r4e3w2q1asdf',
      bm_8: '1a2s3d4f5g6h7j8k9l0qwerty',
      bm_9: 'zxcl9v80bnmasdfg1hj2k3l4',
      bm_10: 'mnbv5cx4zqwe3rtyuiop2lkj',
    };
    this.storeKeys(dummyHashs);
  }

  backendDataCorrespondingToHash = (key: string) => {

    // Implimented a dummy server 
    
    switch (key) {
      case 'm_1':
        return { data: 'kjdf83hjkb34bb23kj43jb32' };
      case 'm_2':
        return { data: 'pl9xnm6b0bnmcv890df9ds83' };
      case 'm_3':
        return { data: 'qwe1tyu2io3p45aszx6cv7bn8' };
      case 'm_4':
        return { data: '987rtyu2qwecvbnmasd3fghjk' };
      case 'm_5_1':
        return { data: 'p0o9i8csdcsdu7y6t5r4e3w2q1asdf' };
      case 'm_5_2':
        return { data: 'p0o9i8udcdfc7y6t5r4e3w2q1asdf' };
      case 'm_5_3':
        return { data: 'p0o9i8u7y6 xc xc t5r4e3w2q1asdf' };
      case 'm_6':
        return { data: '1a2s3d4f5g6h7j8k9l0qwerty' };
      case 'm_7':
        return { data: 'zxcl9v80bnmasdfg1hj2k3l4' };
      case 'm_8':
        return { data: 'mnbv5cx4zqwe3rtyuiop2lkj' };
      case 'm_9':
        return { data: 'yuiopasdfghjklmnbvcxzqwerty' };
      default:
        return null; // Return null or handle other cases as needed
    }
  };

  serverHits = (key: string, err: string) => {
    return new Promise((resolve, reject) => {
      if (!err) {
        setTimeout(() => {
          resolve(this.backendDataCorrespondingToHash(key));
        }, 1000);
      } else {
        setTimeout(() => {
          reject(this.backendDataCorrespondingToHash(key));
        }, 1000);
      }
    });
  };

  getDataFromCache = (key: string) => {
    let itemCached = localStorage.getItem(`data_${key}`);
    if(itemCached && JSON.parse(itemCached)) {
      return JSON.parse(itemCached);
    } else {
      return '';
    }
  };

  setDataToCache = (key: string, value: any, res: any) => {
    if(value) {
      localStorage.setItem(key, value);
      res['isCachedData'] = true;
      localStorage.setItem(`data_${key}`, JSON.stringify(res));
    }
  }

  getDataFromServer = (key: string, backendHash: any, err: any) => {
    return new Promise((resolve, reject) => {
      console.log(`Hash for '${key}' does not match between backend and cache.`);
      this.serverHits(key, err).then((res: any) => {
        let copyRes = {...res};
        this.setDataToCache(key, backendHash, res);
        resolve(copyRes);
        this.hideLoader();
      }).catch((err) => {
        console.log("Something went wrong! " + err.message);
        reject(err);
        this.hideLoader();
      });
    })
  }

  compareHashes = (key: string, err: string): Promise<any> => {
    return new Promise((resolve, reject) => {

      this.showLoader();
      let backendHash = localStorage.getItem(`b${key}`);

      if(!backendHash) {
        this.getHashsFromServer();
        backendHash = localStorage.getItem(`b${key}`);
      }

      let cacheHash = localStorage.getItem(key);

      if(backendHash && cacheHash) {
        if (cacheHash === backendHash) {
          console.log(`Hash for '${key}' matches between backend and cache.`);
          let cacheData = this.getDataFromCache(key);
          if(cacheData) {
            resolve(cacheData);
            this.hideLoader();
          } else {
            this.getDataFromServer(key, backendHash, err).then((data) => resolve(data)).catch((err) => reject(err));
          }
        } else {
          this.getDataFromServer(key, backendHash, err).then((data) => resolve(data)).catch((err) => reject(err));
        }
      } else {
        this.getDataFromServer(key, backendHash, err).then((data) => resolve(data)).catch((err) => reject(err));
      }
    });
  };

  deleteAllData = () => {
    localStorage.clear();
  }
}
