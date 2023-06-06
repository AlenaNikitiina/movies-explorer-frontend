import { Link } from "react-router-dom";
import './Profile.css';

export default function Profile() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <section className="profile">
      <h1 className="profile__title">Привет, Алёна!</h1>
      <form className='profile__form'
        action=''
        onSubmit={handleSubmit}
      >

        <div className="profile__cell">
          <label className="profile__label" htmlFor='name'>Имя</label>
          <input className="profile__input" type="text" name="name" id="name" required />
          <span className="form__error" id="name-error" />
        </div>

        <div className="profile__cell">
          <label className="profile__label" htmlFor='email'>E-mail</label>
          <input className="profile__input" type="email" name="email" id="email" required />
          <span className="form__error" id="email-error" />
        </div>
      
        <button className="profile__edit-button button" type="button">Редактировать</button>
        <Link to='/' className="profile__link link" type="">Выйти из аккаунта</Link>
      
      </form>
    </section>
  )
}

// name={`popup_${name}`}