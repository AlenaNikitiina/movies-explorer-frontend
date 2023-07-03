import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hook/useFormWithValidation.js';

export default function Profile({ onUpdateUser, registrationForm, onSignOut, onOverlayClick }) {
  // задаём контекст, чтобы извлечь из него глобальные переменные
  const currentContext = useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = useState(currentContext.currentUser);
  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation();

  const [isEdit, setIsEdit] = useState(false); // редактируем инфу о себе
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка
  
  function handleSubmit(evt) {
    console.log('handleSubmit');
    evt.preventDefault();

    setRenderLoading(true);
    onUpdateUser(
     values.name,
     values.email,
    );
    setRenderLoading(false);
    //resetForm();
    setCurrentUser(currentUser);
    console.log("currentUser" ,currentUser);
    setIsEdit(false);
    resetForm(currentUser, {}, true);
  };

  // Редактировать профиль
  function handleEditButton(evt) {
    console.log('handleEditButton');
    evt.preventDefault();
    
    setIsEdit(true);
    onUpdateUser(
      values.name,
      values.email
    );
  };

  const isButtonActive = isFormValid
  && !renderLoading
  && (values.name !== values.username || values.email !== values.email);

  // ????
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  },[currentUser, resetForm] )


  return(
    <section className='profile' >
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form
        className='profile__form'
        onSubmit={handleSubmit}
        //renderLoading={renderLoading}
        //isFormValid={isFormValid}
        onClick={onOverlayClick}
      >
        <div className='profile__cell'>
          <label className='profile__label' htmlFor='name'>Имя</label>
          <input
            className='profile__input'
            type='text'
            id='name'
            required
            minLength={2}
            maxLength={30}
            placeholder='Имя'
            name='name'
            //pattern='[a-zA-Za-яА-Я -]{2,30}'
            value={values.name || ''}
            onChange={handleChange}
            //disabled={renderLoading || !isEdit}
          />
        </div>
        <span className='profile__error name-error' id='name-error'>{errors.name}</span>

        <div className='profile__cell'>
          <label className='profile__label' htmlFor='email'>E-mail</label>
          <input
            className='profile__input'
            type='email'
            id='email'
            required
            minLength={4}
            maxLength={40}
            //pattern='^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$'
            //placeholder='pochta@yandex.ru'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            //disabled={renderLoading || !isEdit}
          />
        </div>
        <span className='profile__error email-error' id='email-error'>{errors.email}</span>

        {isEdit ?
          <button type='submit' className='profile__save-button button' disabled={!isButtonActive}>Сохранить</button>
          :
          <button type='button' className='profile__edit-button button' onClick={handleEditButton}>Редактировать</button>
        }
        {!isEdit ?
          <button type='button' className='profile__link button' onClick={onSignOut}>Выйти из аккаунта</button>
          : ''
        }
        {renderLoading ? <Preloader /> : ''}
      </form>
    </section>
  )
}
