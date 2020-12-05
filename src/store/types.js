let types = {
  //Joke
  INIT_JOKE_LIST: '',

  GET_JOKE_DETAILS_REQUEST: '',
  GET_JOKE_DETAILS_SUCCESS: '',
  GET_JOKE_DETAILS_FAILURE: '',

  GET_JOKE_LIST_REQUEST: '',
  GET_JOKE_LIST_SUCCESS: '',
  GET_JOKE_LIST_FAILURE: '',

  GET_SEARCH_JOKE_LIST_REQUEST: '',
  GET_SEARCH_JOKE_LIST_SUCCESS: '',
  GET_SEARCH_JOKE_LIST_FAILURE: '',

};

if (process.env.NODE_ENV === 'production') {
  let idx = Math.floor(Math.random() * 1000);

  for (let prop in types) {
    if (types.hasOwnProperty(prop)) {
      types[prop] = idx++;
    }
  }
} else {
  for (let prop in types) {
    if (types.hasOwnProperty(prop)) {
      types[prop] = prop;
    }
  }
}

export default types;
