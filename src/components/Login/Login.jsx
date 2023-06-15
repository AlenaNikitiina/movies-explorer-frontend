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
      <section className='register'>
        <label className='form__label' htmlFor='email'>E-mail
          <input className='form__input' type='email' name='email' id='email' required />
          <span className='form__error' id='email-error' />
        </label>

        <label className='form__label' htmlFor='password'>Пароль
          <input className='form__input' type='password' name='password' id='password' required minLength={2} maxLength={30} />
          <span className='form__error' id='password-error' />
        </label>
      </section>
    </PopupWithForm>
  )
}