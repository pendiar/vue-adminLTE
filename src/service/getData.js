import fetch from '../config/fetch';
import * as home from './tempdata/home';


/**
 * 创建临时数据
 */
const setpromise = data => new Promise((resolve) => { resolve(data); });

/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('GET', '/test/getJson.php', {
  json: 'getTrustList',
});
// export const cityGuess = () => setpromise(home.guesscity);

/**
 * 以下Api接口不需要进行反向代理
 */

export const hotcity = () => setpromise(home.hotcity);

