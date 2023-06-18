import './Register.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Register({ handleRegister }) {
  const { handleChange, values, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(
      values.name,
      values.email,
      values.password
    );
    resetForm();
  }

  return(
    <PopupWithForm
      name='register'
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      link='/signin'
      linkText='Войти'
      question='Уже зарегистрированы?'
      //renderLoading={renderLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <section className='register'>
        <label className='register__label' htmlFor='name'>Имя
          <input
            className='register__input'
            type='text'
            name='name'
            id='name'
            placeholder="Имя"
            required
            minLength={2}
            maxLength={30}
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className='register__error' id='name-error'>{errors.name}</span>
        </label>
 
        <label className='register__label' htmlFor='email'>E-mail
          <input
            className='register__input'
            type='email'
            name='email'
            id='email'
            placeholder="Электронная почта"
            required
            minLength={4}
            maxLength={40}
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className='register__error' id='email-error'>{errors.email}</span>
        </label>

        <label className='register__label' htmlFor='password'>Пароль
          <input
            className='register__input'
            type='password'
            name='password'
            id='password'
            placeholder="Пароль"
            required
            minLength={2}
            maxLength={30}
            //val
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='register__error' id='password-error'>{errors.password}</span>
        </label>
      </section>
    </PopupWithForm>
  )
}