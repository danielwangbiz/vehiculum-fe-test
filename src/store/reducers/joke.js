import types from '../types';

const INITIAL_STATE = {
  isFetchingList: false,
  isFetchingSearchList: false,
  isFetchingDetails: false,

  jokeList: [],
  searchJokeList: [],

  details: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // Init Jokes list
    case types.INIT_JOKE_LIST:
      return {
        ...state,
        jokeList: [],
      };

    case types.GET_JOKE_DETAILS_REQUEST:
      return {
        ...state,
        isFetchingDetails: true,
      };
    case types.GET_JOKE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetchingDetails: false,
        details: action.payload,
      };
    case types.GET_JOKE_DETAILS_FAILURE:
      return {
        ...state,
        isFetchingDetails: false,
      };

    // Get list
    case types.GET_JOKE_LIST_REQUEST:
      return {
        ...state,
        isFetchingList: true,
      };
    case types.GET_JOKE_LIST_SUCCESS:

      const newJokeList = [...state.jokeList];
      action.payload.forEach(i => {
        if (newJokeList.findIndex(joke => joke.id === i.id) === -1) {
          newJokeList.push(i);
        }
      });
      return {
        ...state,
        isFetchingList: false,
        jokeList: newJokeList,
      };
    case types.GET_JOKE_LIST_FAILURE:
      return {
        ...state,
        isFetchingList: false,
      };

    // Get Search list
    case types.GET_SEARCH_JOKE_LIST_REQUEST:
      return {
        ...state,
        isFetchingSearchList: true,
      };
    case types.GET_SEARCH_JOKE_LIST_SUCCESS:
      return {
        ...state,
        isFetchingSearchList: false,
        searchJokeList: action.payload,
      };
    case types.GET_SEARCH_JOKE_LIST_FAILURE:
      return {
        ...state,
        isFetchingSearchList: false,
      };

    // Initial state
    default:
      return state;
  }
}
