
import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function Login() {

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <PopupWithForm
      name='login'
      title='Рады видеть!'
      buttonText='Войти'
      link='/signup'
      linkText='Регистрация'
      question='Ещё не зарегистрированы?'
      onSubmit={handleSubmit}
    >
      <section className='login register'>
        <label className='login__label' htmlFor='email'>E-mail
          <input
            className='login__input'
            type='email'
            name='email'
            id='email'
            required
          />
          <span className='login__error' id='email-error' />
        </label>

        <label className='login__label' htmlFor='password'>Пароль
          <input
            className='login__input'
            type='password'
            name='password'
            id='password'
            required
            minLength={2}
            maxLength={30}
          />
          <span className='login__error' id='password-error' />
        </label>
      </section>
    </PopupWithForm>
  )
}






/*
import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function Login() {

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <PopupWithForm
      name='login'
      title='Рады видеть!'
      buttonText='Войти'
      link='/signup'
      linkText='Регистрация'
      question='Ещё не зарегистрированы?'
      onSubmit={handleSubmit}
    >
      <section className='login register'>
        <label className='login__label' htmlFor='email'>E-mail
          <input
            className='login__input'
            type='email'
            name='email'
            id='email'
            required
          />
          <span className='login__error' id='email-error' />
        </label>

        <label className='login__label' htmlFor='password'>Пароль
          <input
            className='login__input'
            type='password'
            name='password'
            id='password'
            required
            minLength={2}
            maxLength={30}
          />
          <span className='login__error' id='password-error' />
        </label>
      </section>
    </PopupWithForm>
  )
}
*/