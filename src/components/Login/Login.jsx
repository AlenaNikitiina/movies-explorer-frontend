import './Login.css';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Login({ handleLogin, renderLoading }) {
  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    const resetFormCallBack = () => {
      resetForm();
    }
    handleLogin(
      values.email,
      values.password,
      resetFormCallBack
    );
  };

  return(
    <PopupWithForm
      name='login'
      title='Рады видеть!'
      buttonText='Войти'
      link='/signup'
      question='Ещё не зарегистрированы?'
      renderLoading={renderLoading}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      linkText={renderLoading ? `Регистрация...` : `Зарегистрироваться`}
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
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='login__error password-error' id='password-error'>{errors.password}</span>
        </label>
        {renderLoading ? <Preloader /> : ''}
      </section>
    </PopupWithForm>
  )
}
