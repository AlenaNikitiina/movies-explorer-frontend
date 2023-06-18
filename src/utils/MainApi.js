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

  //
  setAuthToken (token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  // 1 Редактирование профиля
  editingProfile (newName, newEmail) {
    return fetch(this._url + `/users/me`, {
      method: 'PATCH', // заменить имя и почту
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newEmail
    })})
    .then(this._checkServerAnswer);
  }


  // Авторизация
  authorize (email, password) {
  return fetch(`${this._url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {email, password} ),
  })
  .then(this._checkServerAnswer);
  };

  //2
  // Регистрация
  register(name, email, password) {
  return fetch(`${this._url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
  .then(this._checkServerAnswer);
  };

}


//// экзмпляр апи
const mainApi = new MainApi({
  url:"http://localhost:3000", // ссылка на бэкенд
  //url:"https://alenanik.nomoredomains.monster", // ссылка на бэкенд
  headers: {
    "Content-type": 'application/json'
  }
}); 

export default mainApi;