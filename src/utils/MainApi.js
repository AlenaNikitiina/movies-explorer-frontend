import { BACKEND_URL } from './constants.js';

class MainApi {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;

    const token = localStorage.getItem("jwt")
    if (token)
      this.setAuthToken(token);
  }

  // проверка ответа от сервера. Венесено в метод, чтобы не писать одно и тоже
  _checkServerAnswer (response) {
    if (response.ok) {
      return response.json(); // если все ок
    } else {
      return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`); //если все не ок скажи ошибка
    }
  }

  setAuthToken (token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  // 1 Редактирование профиля
  editingProfile (newName, newEmail) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH', // заменить имя и почту
      headers: {
        ...this._headers,
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newName,
        email: newEmail
    })})
    .then(this._checkServerAnswer);
  }

  // Регистрация
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        ...this._headers,
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(this._checkServerAnswer);
  };
  
  // Авторизация
  login (email, password) {
  return fetch(`${this._url}/signin`, {
    method: "POST",
    headers: {
      ...this._headers,
      Accept: "application/json",
    },
    body: JSON.stringify( {email, password} ),
  })
  .then(this._checkServerAnswer);
  };

  // Проверка токена
  checkToken (token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkServerAnswer);
  };

  // сохранить фильм
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie),
    })
    .then(this._checkServerAnswer);
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkServerAnswer);
  }

  // получить сохранённые пользователем фильм
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

}

//// экзмпляр апи
const mainApi = new MainApi({
  // url:"http://localhost:3000", // ссылка на бэкенд
  url: BACKEND_URL,
  headers: {
    "Content-type": 'application/json'
  }
}); 

export default mainApi;