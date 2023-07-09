import './Profile.css';
import { useContext, useEffect, useState, useRef } from 'react';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hook/useFormWithValidation.js';
import mainApi from '../../utils/MainApi';
import { AppMessage } from '../../utils/constants';

export default function Profile({
    onSignOut, onOverlayClick, setIsInfoTooltip, setRegistrationForm
  }) {

  // задаём контекст, чтобы извлечь из него глобальные переменные
  const currentContext = useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = useState(currentContext.currentUser);
  const initialValues = {
    username: currentUser.name,
    email: currentUser.email,
  };
  const { handleChange, values, errors, isFormValid, resetForm } = useFormWithValidation(initialValues);
  const [isEdit, setIsEdit] = useState(false); // редактируем инфу о себе
  const [renderLoading, setRenderLoading] = useState(false);
  const nameInputRef = useRef(false);

  // Обработчик изменения данных пользователя. имя, почта.
  function onUpdateUser(name, email) {
  //const onUpdateUser = (name, email) => {
    setRenderLoading(true);
    mainApi
      .editingProfile(name, email)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
        setIsInfoTooltip(true); // Информационная подсказка
        setRegistrationForm({
          status: true,
          text: AppMessage.USER_DATA_UPDATE,
        })
        // потом подсказки исчезнут
        setTimeout(() => {
          setIsInfoTooltip(false);
          setRenderLoading(false);
        }, 2000);
      })
      .catch(err => {
        console.log(AppMessage.UPDATE_ERR, err);
        setRegistrationForm({
          status: false,
          text: AppMessage.UNSUCCESS,
        })
        setIsInfoTooltip(true);
        // потом подсказки исчезнут
        setTimeout(() => {
          setIsInfoTooltip(false);
          setRenderLoading(false);
        }, 2000);
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
    nameInputRef.current.focus();
  };

  const isButtonActive = isFormValid
  && !renderLoading
  && (values.name !== initialValues.username || values.email !== initialValues.email);

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
        renderLoading={renderLoading}
        isFormValid={isFormValid}
        onClick={onOverlayClick}
      >
        <div className='profile__cell'>
          <label className='profile__label' htmlFor='name'>Имя</label>
          <input
            className='profile__input'
            type='text'
            id='name'
            ref={nameInputRef}
            required
            minLength={2}
            maxLength={30}
            placeholder='Имя'
            name='name'
            value={values.name || ''}
            onChange={handleChange}
            disabled={renderLoading || !isEdit}
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
            disabled={renderLoading || !isEdit}
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
