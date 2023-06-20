
import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Login({ handleLogin, renderLoading }) {
  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation();

   const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(
      values.email,
      values.password
    );
    resetForm();
  }

  return(
    <PopupWithForm
      name='login'
      title='Рады видеть!'
      buttonText='Войти'
      link='/signup'
      linkText='Регистрация'
      question='Ещё не зарегистрированы?'
      renderLoading={renderLoading}
      isFormValid={isFormValid}
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
            minLength={4}
            maxLength={40}
            //pattern=''
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className='login__error email-error' id='email-error'>{errors.email}</span>
        </label>

        <label className='login__label' htmlFor='password'>Пароль
          <input
            className='login__input'
            type='password'
            name='password'
            id='password'
            placeholder="Пароль"
            required
            minLength={2}
            maxLength={30}
            pattern='[A-Za-z0-9]{2,30}'
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='login__error password-error' id='password-error'>{errors.password}</span>
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