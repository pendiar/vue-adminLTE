import {
  RECORD_ADDRESS,
} from './mutation-types';

// import {
//   setStore,
//   getStore,
// } from '../config/utils';

export default {
  [RECORD_ADDRESS](state, {
    latitude,
    longitude,
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
};
