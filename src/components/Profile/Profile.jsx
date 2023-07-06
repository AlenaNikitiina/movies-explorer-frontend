import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hook/useFormWithValidation.js';
import mainApi from '../../utils/MainApi';
import { AppMessage } from '../../utils/constants';

export default function Profile({ onSignOut, onOverlayClick }) {
  // задаём контекст, чтобы извлечь из него глобальные переменные
  const currentContext = useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = useState(currentContext.currentUser);
  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation();

  const [isEdit, setIsEdit] = useState(false); // редактируем инфу о себе
  const [renderLoading, setRenderLoading] = useState(false); // идет сохранение/ загрузка

  // Обработчик изменения данных пользователя. имя, почта.
  function onUpdateUser(name, email) {
    setRenderLoading(true);
    mainApi
      .editingProfile(name, email)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
      })
      .catch(err => {
        console.log(AppMessage.UPDATE_ERR, err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  };

  //
  function handleSubmit(evt) {
    evt.preventDefault();

    setRenderLoading(true);
    onUpdateUser(
     values.name,
     values.email,
    );
    setRenderLoading(false);
    setCurrentUser(currentUser);
    setIsEdit(false);
    resetForm(currentUser, {}, true);
  };

  // Редактировать профиль
  function handleEditButton(evt) {
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

  //
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
        isFormValid={isFormValid}
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
            placeholder='pochta@yandex.ru'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            //disabled={renderLoading || !isEdit}
          />
        </div>
        {renderLoading ? <Preloader /> : ''}
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
      </form>
    </section>
  )
}
