import {
  baseUrl,
} from './env';

export default async (fetchType = 'GET', fetchUrl = '', data = {}, method = 'fetch') => {
  const type = fetchType.toUpperCase();
  let url = baseUrl + fetchUrl;

  if (type === 'GET') {
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach((key) => {
      dataStr += `${key}=${data[key]}&`;
    });

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = `${url}?${dataStr}`;
    }
  }

  let response;
  let responseJson;
  // 使用 fetch api 获取数据
  if (window.fetch && method === 'fetch') {
    const requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'force-cache',
    };

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data),
      });
    }

    try {
      response = await fetch(url, requestConfig);
      responseJson = await response.json();
    } catch (error) {
      throw new Error(error);
    }
    return responseJson;
  }
  // 使用 ajax api 获取数据
  let requestObj;
  if (window.XMLHttpRequest) {
    requestObj = new XMLHttpRequest();
  } else {
    requestObj = new ActiveXObject('Microsoft.XMLHTTP');
  }

  let sendData = '';
  if (type === 'POST') {
    sendData = JSON.stringify(data);
  }

  const getResponse = () => new Promise((resolve, reject) => {
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response;
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
          resolve(obj);
        } else {
          reject(new Error(requestObj));
        }
      }
    };
    requestObj.open(type, url, true);
    requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    requestObj.send(sendData);
  });
  try {
    responseJson = await getResponse();
  } catch (error) {
    throw new Error(error);
  }
  return responseJson;
};
