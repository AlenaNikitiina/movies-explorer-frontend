import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './Register.css';

export default function Register() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <PopupWithForm
      name='register'
      title='Добро пожаловать!'
      onSubmit={handleSubmit}
      buttonText='Зарегистрироваться'
      link='signin'
      linkText='Войти'
      question='Уже зарегистрированы?'
    >
      <section className='register'>
        <label className='form__label' htmlFor='name'>Имя
          <input className='form__input' type='text' name='name' id='name' required minLength={2} maxLength={30}/>
          <span className='form__error' id='name-error' />
        </label>

        <label className='form__label' htmlFor='email'>E-mail
          <input className='form__input' type='email' name='email' id='email' required />
          <span className='form__error' id='email-error' />
        </label>

        <label className='form__label' htmlFor='password'>Пароль
          <input className='form__input' type='password' name='password' id='password' required />
          <span className='form__error' id='password-error' />
        </label>
      </section>
    </PopupWithForm>
  )
}