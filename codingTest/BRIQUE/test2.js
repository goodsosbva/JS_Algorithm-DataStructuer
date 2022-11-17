console.log(location.origin);
const url = location.origin;
// 핑
const ping = (url, timeout = 6000) => {
    return new Promise((resolve, reject) => {
      const urlRule = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
      if (!urlRule.test(url)) reject('invalid url');
      try {
          fetch(url, {
            credentials: 'include', // 모든 요청에 인증 정보 포함
        })
          .then(() => resolve(true))
          .catch(() => resolve(false));
        setTimeout(() => {
          resolve(false);
        }, timeout);
      } catch (e) {
        reject(e);
      }
    });
  };

  ping(url)
    .then(res => console.log(res))
    .catch(e => console.log(e))

  