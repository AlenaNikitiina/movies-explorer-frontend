import { MOVIES_API_URL } from './constants.js';

class MoviesApi {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // проверка ответа от сервера. Венесено в метод, чтобы не писать одно и тоже
  _checkAnswer (response) {
    if (response.ok) {
      return response.json(); // если все ок
    } else {
      return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`); //если все не ок скажи ошибка
    }
  }

  getMovies() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkAnswer);
  };

}

//// экзмпляр апи
const moviesApi = new MoviesApi({
  url: MOVIES_API_URL, // ссылка на бэкенд
  headers: {
    "Content-type": 'application/json'
  }
});

export default moviesApi;