import './Profile.css';
import { Link } from "react-router-dom";
import { useContext,  useState, useEffect } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile( {onUpdateUser, renderLoading, signOut } ) {
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState(''); // асинхрон ф меняется когда мен пропсы или юстейт
  const [userEmail, setUserEmail] = useState('');

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(evt) {
    setUserName(evt.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

   // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setUserName(currentUser.userName);
    setUserEmail(currentUser.userEmail);
  }, [currentUser]);

  // запрещаем браузеру переходить по адресу формы. передаем значения управляемых компонентов во внешний обработчик
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(userName, userEmail);
  }

  const handleEditButton = (evt) => {
    evt.preventDefault();
  }

  return(
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${userName}!`}</h1>
      <form
        className='profile__form'
        onSubmit={handleSubmit}
        renderLoading={renderLoading}
      >
        <div className="profile__cell">
          <label className="profile__label" htmlFor='name'>Имя</label>
          <input
            className="profile__input"
            type="text"
            id="name"
            required
            minLength={2}
            maxLength={30}
            placeholder="Имя"
            name={userName}
            value={userName || ''}
            onChange={handleChangeName} // Значение элемента «привязывается» к значению стейта
            renderLoading={renderLoading}
          />
          <span className="form__error" id="name-error" />
        </div>

        <div className="profile__cell">
          <label className="profile__label" htmlFor='email'>E-mail</label>
          <input
            className="profile__input"
            type="email"
            id="email"
            required
            minLength={4}
            maxLength={40}
            //validation
            placeholder="pochta@yandex.ru"
            name={userEmail}
            value={userEmail || ''}
            onChange={handleChangeEmail}
            renderLoading={renderLoading}
          />
          <span className="form__error" id="email-error" />
        </div>
      
        <button className="profile__edit-button button" type="button" onClick={handleEditButton}>Редактировать</button>
        <Link to='/' className="profile__link link" onClick={signOut}>Выйти из аккаунта</Link>
      </form>
    </section>
  )
}

// name={`popup_${name}`}