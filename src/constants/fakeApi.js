// Returns successful promise with provided data

const RESPONSE_DELAY = 500;

const apiWrapper = (data, isSuccess = true, status = 200, statusText = 'OK') => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve({
        data,
        status,
        statusText,
      });
    } else {
      reject({
        message: statusText,
        response: {
          data,
          status,
          statusText,
        },
      });
    }
  }, RESPONSE_DELAY);
});

const jokeAllList = [
  {
    'categories': ['animal'],
    'created_at': '2020-01-05 13:42:19.576875',
    'icon_url': 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    'id': '9ovbd5b1t66_x92jwrq1yq',
    'updated_at': '2020-01-05 13:42:19.576875',
    'url': 'https://api.chucknorris.io/jokes/9ovbd5b1t66_x92jwrq1yq',
    'value': 'Chuck Norris once rode a bull, and nine months later it had a calf.',
  },
  {
    'categories': ['animal'],
    'created_at': '2020-01-05 13:42:19.576875',
    'icon_url': 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    'id': '9ovbd5b1t66_x92jwrq1yq',
    'updated_at': '2020-01-05 13:42:19.576875',
    'url': 'https://api.chucknorris.io/jokes/9ovbd5b1t66_x92jwrq1yq',
    'value': 'Chuck Norris once rode a bull, and nine months later it had a calf.',
  },
  {
    'categories': ['animal'],
    'created_at': '2020-01-05 13:42:19.576875',
    'icon_url': 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    'id': '9ovbd5b1t66_x92jwrq1yq',
    'updated_at': '2020-01-05 13:42:19.576875',
    'url': 'https://api.chucknorris.io/jokes/9ovbd5b1t66_x92jwrq1yq',
    'value': 'Chuck Norris once rode a bull, and nine months later it had a calf.',
  },
  {
    'categories': ['animal'],
    'created_at': '2020-01-05 13:42:19.576875',
    'icon_url': 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    'id': '9ovbd5b1t66_x92jwrq1yq',
    'updated_at': '2020-01-05 13:42:19.576875',
    'url': 'https://api.chucknorris.io/jokes/9ovbd5b1t66_x92jwrq1yq',
    'value': 'Chuck Norris once rode a bull, and nine months later it had a calf.',
  },
  {
    'categories': ['animal'],
    'created_at': '2020-01-05 13:42:19.576875',
    'icon_url': 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    'id': '9ovbd5b1t66_x92jwrq1yq',
    'updated_at': '2020-01-05 13:42:19.576875',
    'url': 'https://api.chucknorris.io/jokes/9ovbd5b1t66_x92jwrq1yq',
    'value': 'Chuck Norris once rode a bull, and nine months later it had a calf.',
  },
];

export const FAKE_API = {
  isFakeApi: true,

  joke: {
    getJokeDetails: (id) => apiWrapper({ data: jokeAllList[[0]] }),

    getRandomJoke: (category) => apiWrapper({ data: jokeAllList[[0]] }),

    getSearchJokeList: (searchText) => apiWrapper({ data: jokeAllList }),
  },
};

export default FAKE_API;
