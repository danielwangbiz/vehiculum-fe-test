import axios from 'axios';

import { API_SERVER } from './index';
// import { FAKE_API } from './fakeApi';

// Create instance
const axiosInstance = axios.create();

// Configure axios instances
axios.defaults.baseURL = API_SERVER;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.defaults.baseURL = API_SERVER;
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

// Axios wrapper to handle error
const axiosWrapper = apiCall => apiCall.then(res => res.data).catch(err => Promise.reject(err));

// Define API calls
let api = {
  isFakeApi: false,

  joke: {
    getJokeDetails: (id) => axiosWrapper(axiosInstance.get(`/jokes/${id}`)),

    getRandomJoke: (category) => axiosWrapper(axiosInstance.get(`/jokes/random`, category === 'uncategorized' ? {} : { params: { category } })),

    getSearchJokeList: (query) => axiosWrapper(axiosInstance.get('/jokes/search', { params: { query }})),
  },

};

// if (USE_FAKE_API) {
//   api = FAKE_API;
// }
// api = FAKE_API;

export { api, axiosInstance };

export default api;
