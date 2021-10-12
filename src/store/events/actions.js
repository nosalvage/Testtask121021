import axios from 'axios';

export const types = {
  FETCH_EVENTS: 'events/FETCH_EVENTS',
  FETCH_EVENTS_SUCCESS: 'events/FETCH_EVENTS_SUCCESS',
  FETCH_EVENTS_FAIL: 'events/FETCH_EVENTS_FAIL',
};

const API_URL = 'https://api.github.com';

/**
 *
 * @param {Number} params.perPage Results per page (max 100) Default: 25
 * @param {Number} params.page Page number of the results to fetch Default: 1
 * @returns
 */
export const fetchEvents =
  ({perPage = 25, page = 1} = {}) =>
  async dispatch => {
    try {
      dispatch({type: types.FETCH_EVENTS});

      const url = `${API_URL}/events`;

      const result = await axios.get(url, {
        headers: {Accept: 'application/vnd.github.v3+json'},
        params: {
          per_page: perPage,
          page,
        },
      });

      if (result.status !== 200) {
        throw Error('events not found');
      }

      // Искусственная задержка
      setTimeout(() => {
        dispatch({type: types.FETCH_EVENTS_SUCCESS, payload: result.data});
      }, 1000);
    } catch (error) {
      dispatch({type: types.FETCH_EVENTS_FAIL});
      console.warn(error);
    }
  };
