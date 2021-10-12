import reducer from 'src/utils/reducer';

import {types} from './actions';

const initState = {
  data: [],
  isFetching: false,
};

export default reducer(initState, {
  [types.FETCH_EVENTS]: state => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [types.FETCH_EVENTS_SUCCESS]: (state, action) => {
    const data = action.payload;

    return {
      ...state,
      data,
      isFetching: false,
    };
  },
  [types.FETCH_EVENTS_FAIL]: state => {
    return {
      ...state,
      data: [],
      isFetching: false,
    };
  },
});
