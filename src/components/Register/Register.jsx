import './Register.css';
import { useState } from 'react';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Register({ handleRegister }) {
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка
  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    
    handleRegister(
      values.name,
      values.email,
      values.password
    );
    setRenderLoading(true);
    resetForm();
  }

  return(
    <PopupWithForm
      name='register'
      title='Добро пожаловать!'
      buttonText='Зарегистрироваться'
      link='/signin'
      question='Уже зарегистрированы?'
      renderLoading={renderLoading}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      linkText={renderLoading ? `Регистрация...` : `Войти`}
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
            pattern='[a-zA-Za-яА-Я -]{2,30}'
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className='register__error name-error' id='name-error'>{errors.name}</span>
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
            //pattern='/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i'
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className='register__error email-error' id='email-error'>{errors.email}</span>
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
            pattern='[A-Za-z0-9]{2,30}'
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='register__error password-error' id='password-error'>{errors.password}</span>
        </label>
        {renderLoading ? <Preloader /> : ''}
      </section>
    </PopupWithForm>
  )
}