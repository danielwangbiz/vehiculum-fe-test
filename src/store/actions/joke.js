import types from '../types';
import api from 'constants/api';
import _get from 'lodash/get';

export const getJokeDetails = (id) => (dispatch, getState) => {
  if (getState().rootReducer.joke.isFetchingDetails) { return Promise.reject(); }

  dispatch({
    type: types.GET_JOKE_DETAILS_REQUEST,
  });

  return api.joke.getJokeDetails(id)
    .then(res => {

      dispatch({
        type: types.GET_JOKE_DETAILS_SUCCESS,
        payload: res,
      });

      return res;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get Details Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.GET_JOKE_DETAILS_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
}

export const getJokeList = (currentCategory) => (dispatch, getState) => {
  if (getState().rootReducer.joke.isFetchingList) { return Promise.reject(); }

  dispatch({
    type: types.GET_JOKE_LIST_REQUEST,
  });

  const JokesPromises = [];

  for (let i = 0; i < 6; i++) {
    JokesPromises.push(new Promise((resolve, reject) => {
      api.joke.getRandomJoke(currentCategory)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          resolve(false);
        });
    }));
  }

  return Promise.all(JokesPromises)
    .then(jokes => {

      dispatch({
        type: types.GET_JOKE_LIST_SUCCESS,
        payload: jokes.reduce((acc, cur) => {
          if (cur) { acc.push(cur); }
          return acc;
        }, []),
      });

      return true;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.GET_JOKE_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const getSearchJokeList = (searchText) => (dispatch, getState) => {
  if (getState().rootReducer.joke.isFetchingSearchList) { return Promise.reject(); }

  dispatch({
    type: types.GET_SEARCH_JOKE_LIST_REQUEST,
  });

  return api.joke.getSearchJokeList(searchText)
    .then(res => {

      dispatch({
        type: types.GET_SEARCH_JOKE_LIST_SUCCESS,
        payload: res.result,
      });

      return res;
    })
    .catch(err => {
      const msg = _get(err, 'response.data.msg', 'Get List Failed!');
      const payload = { ...err, msg };

      dispatch({
        type: types.GET_SEARCH_JOKE_LIST_FAILURE,
        payload,
      });

      return Promise.reject(payload);
    });
};

export const initJokeList = () => ({
  type: types.INIT_JOKE_LIST,
});
