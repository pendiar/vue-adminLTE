import {
  cityGuess,
} from '../service/getData';

import {
  RECORD_ADDRESS,
} from './mutation-types';

export default {
  async getUserInfo({
    commit,
  }) {
    const res = await cityGuess();
    commit(RECORD_ADDRESS, res);
  },
};
